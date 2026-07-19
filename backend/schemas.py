from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ComplaintBase(BaseModel):
    name: str
    location: str
    category: str
    description: str
    priority: str
    status: str


class ComplaintCreate(ComplaintBase):
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class ComplaintUpdate(BaseModel):
    status: str


class ComplaintResponse(ComplaintBase):
    id: int
    image: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class DashboardStats(BaseModel):
    total: int
    pending: int
    in_progress: int
    resolved: int


class AdminLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str