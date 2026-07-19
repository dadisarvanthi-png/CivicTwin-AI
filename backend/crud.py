from sqlalchemy.orm import Session
from sqlalchemy import func

import models


# =====================================
# CREATE COMPLAINT
# =====================================

def create_complaint(
    db: Session,
    complaint_data: dict,
    image_name: str = None
):

    complaint = models.Complaint(
        **complaint_data,
        image=image_name
    )

    db.add(complaint)
    db.commit()
    db.refresh(complaint)

    return complaint



# =====================================
# GET ALL COMPLAINTS
# =====================================

def get_complaints(db: Session):

    return (
        db.query(models.Complaint)
        .order_by(
            models.Complaint.created_at.desc()
        )
        .all()
    )



# =====================================
# GET SINGLE COMPLAINT
# =====================================

def get_complaint(
    db: Session,
    complaint_id: int
):

    return (
        db.query(models.Complaint)
        .filter(
            models.Complaint.id == complaint_id
        )
        .first()
    )



# =====================================
# UPDATE STATUS
# =====================================

def update_status(
    db: Session,
    complaint_id: int,
    status: str
):

    complaint = get_complaint(
        db,
        complaint_id
    )


    if complaint is None:
        return None


    complaint.status = status


    history = models.ComplaintHistory(
        complaint_id=complaint.id,
        status=status
    )


    db.add(history)

    db.commit()

    db.refresh(complaint)


    return complaint



# =====================================
# DELETE COMPLAINT
# =====================================

def delete_complaint(
    db: Session,
    complaint_id: int
):

    complaint = get_complaint(
        db,
        complaint_id
    )


    if complaint:

        db.delete(complaint)

        db.commit()


    return complaint



# =====================================
# DASHBOARD
# =====================================

def dashboard_stats(db: Session):

    total = db.query(
        models.Complaint
    ).count()


    pending = db.query(
        models.Complaint
    ).filter(
        models.Complaint.status == "Pending"
    ).count()


    resolved = db.query(
        models.Complaint
    ).filter(
        models.Complaint.status == "Resolved"
    ).count()


    high_priority = db.query(
        models.Complaint
    ).filter(
        models.Complaint.priority == "High"
    ).count()


    return {

        "total_complaints": total,

        "pending_complaints": pending,

        "resolved_complaints": resolved,

        "high_priority_complaints": high_priority

    }



# =====================================
# CATEGORY STATS
# =====================================

def category_stats(db: Session):

    return (
        db.query(
            models.Complaint.category,
            func.count(models.Complaint.id)
        )
        .group_by(
            models.Complaint.category
        )
        .all()
    )



# =====================================
# PRIORITY STATS
# =====================================

def priority_stats(db: Session):

    return (
        db.query(
            models.Complaint.priority,
            func.count(models.Complaint.id)
        )
        .group_by(
            models.Complaint.priority
        )
        .all()
    )