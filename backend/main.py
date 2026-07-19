from fastapi import (
    FastAPI,
    Depends,
    UploadFile,
    File,
    Form,
    HTTPException,
)

from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from sqlalchemy.orm import Session 
from utils.email_service import send_status_email

import shutil
import os

import models
import schemas
import crud

from database import (
    Base,
    engine,
    SessionLocal,
)

from utils.geocoder import get_coordinates
from utils.gps_extractor import get_gps
from utils.priority_predictor import predict_priority

from auth import (
    create_access_token,
)


# =====================================
# APP CONFIGURATION
# =====================================

app = FastAPI(
    title="CivicTwin AI",
    version="2.0"
)


# =====================================
# CORS CONFIGURATION
# =====================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================
# UPLOAD FILE CONFIGURATION
# =====================================

os.makedirs(
    "uploads",
    exist_ok=True
)

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)


# =====================================
# DATABASE
# =====================================

Base.metadata.create_all(
    bind=engine
)


# =====================================
# DATABASE SESSION
# =====================================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



# =====================================
# HOME
# =====================================

@app.get("/")
def home():

    return {
        "message": "Welcome to CivicTwin AI Backend"
    }



# =====================================
# ADMIN LOGIN
# =====================================

@app.post("/login")
def login(
    username: str = Form(...),
    password: str = Form(...),
):

    if username == "admin" and password == "admin123":

        token = create_access_token(
            {
                "username": username
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer"
        }


    raise HTTPException(
        status_code=401,
        detail="Invalid Credentials"
    )



# =====================================
# CREATE COMPLAINT
# =====================================

@app.post(
    "/complaints",
    response_model=schemas.ComplaintResponse
)
def create_complaint(
    name: str = Form(...),
    email: str = Form(...),
    location: str = Form(...),
    category: str = Form(...),
    description: str = Form(...),
    priority: str = Form(None),
    status: str = Form("Pending"),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
):

    image_name = None

    latitude = None
    longitude = None


    # AI Priority Prediction

    if not priority:

        priority = predict_priority(
            description
        )


    # Save Image

    if image:

        image_name = image.filename

        file_path = os.path.join(
            "uploads",
            image_name
        )


        with open(
            file_path,
            "wb"
        ) as buffer:

            shutil.copyfileobj(
                image.file,
                buffer
            )


        photo_lat, photo_lon = get_gps(
            file_path
        )


        if photo_lat:

            latitude = photo_lat
            longitude = photo_lon



    # Location Coordinates

    if latitude is None:

        geo_lat, geo_lon = get_coordinates(
            location
        )


        if geo_lat:

            latitude = geo_lat
            longitude = geo_lon



    complaint_data = {

        "name": name,

        "email": email,

        "location": location,

        "category": category,

        "description": description,

        "priority": priority,

        "status": status,

        "latitude": latitude,

        "longitude": longitude,

    }



    return crud.create_complaint(
        db=db,
        complaint_data=complaint_data,
        image_name=image_name
    )



# =====================================
# GET ALL COMPLAINTS
# =====================================

@app.get(
    "/complaints",
    response_model=list[schemas.ComplaintResponse]
)
def get_all_complaints(
    db: Session = Depends(get_db)
):

    return crud.get_complaints(
        db
    )



# =====================================
# GET SINGLE COMPLAINT
# =====================================

@app.get(
    "/complaints/{complaint_id}",
    response_model=schemas.ComplaintResponse
)
def get_single_complaint(
    complaint_id: int,
    db: Session = Depends(get_db)
):

    complaint = crud.get_complaint(
        db,
        complaint_id
    )


    if complaint is None:

        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )


    return complaint



# =====================================
# COMPLAINT HISTORY
# =====================================

@app.get(
    "/complaints/{complaint_id}/history"
)
def complaint_history(
    complaint_id: int,
    db: Session = Depends(get_db)
):

    return (
        db.query(
            models.ComplaintHistory
        )
        .filter(
            models.ComplaintHistory.complaint_id
            ==
            complaint_id
        )
        .order_by(
            models.ComplaintHistory.updated_at
        )
        .all()
    )



# =====================================
# UPDATE STATUS
# =====================================

@app.put(
    "/complaints/{complaint_id}",
    response_model=schemas.ComplaintResponse,
)
async def update_status(
    complaint_id: int,
    status: str = Form(...),
    db: Session = Depends(get_db),
):

    complaint = crud.update_status(
        db,
        complaint_id,
        status,
    )

    if complaint is None:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found",
        )

    await send_status_email(
        email=complaint.email,
        name=complaint.name,
        status=complaint.status,
    )

    return complaint
    



# =====================================
# DELETE COMPLAINT
# =====================================

@app.delete(
    "/complaints/{complaint_id}"
)
def delete_complaint(
    complaint_id: int,
    db: Session = Depends(get_db)
):

    complaint = crud.get_complaint(
        db,
        complaint_id
    )


    if complaint is None:

        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )


    if complaint.image:

        image_path = os.path.join(
            "uploads",
            complaint.image
        )


        if os.path.exists(image_path):

            os.remove(
                image_path
            )


    crud.delete_complaint(
        db,
        complaint_id
    )


    return {
        "message": "Complaint deleted successfully"
    }



# =====================================
# ADMIN DASHBOARD
# =====================================

@app.get(
    "/dashboard"
)
def get_dashboard_stats(
    db: Session = Depends(get_db)
):

    return crud.dashboard_stats(
        db
    )



# =====================================
# CATEGORY STATISTICS
# =====================================

@app.get(
    "/dashboard/categories"
)
def category_statistics(
    db: Session = Depends(get_db)
):

    rows = crud.category_stats(
        db
    )


    return [

        {
            "category": row[0],
            "count": row[1]
        }

        for row in rows

    ]



# =====================================
# PRIORITY STATISTICS
# =====================================

@app.get(
    "/dashboard/priorities"
)
def priority_statistics(
    db: Session = Depends(get_db)
):

    rows = crud.priority_stats(
        db
    )


    return [

        {
            "priority": row[0],
            "count": row[1]
        }

        for row in rows

    ]



# =====================================
# HEALTH CHECK
# =====================================

@app.get("/health")
def health():

    return {

        "status": "Running",

        "backend": "FastAPI",

        "database": "PostgreSQL (Railway)",

        "version": "2.0"

    }