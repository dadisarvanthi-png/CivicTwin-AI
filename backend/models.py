from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import DateTime
from sqlalchemy import Boolean
from sqlalchemy.sql import func

from database import Base


# ------------------------------------
# Complaint Table
# ------------------------------------
class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    email = Column(String, nullable=False)

    location = Column(String, nullable=False)

    category = Column(String, nullable=False)

    description = Column(String, nullable=False)

    priority = Column(String, default="Medium")

    status = Column(String, default="Pending")

    image = Column(String, nullable=True)

    latitude = Column(Float, nullable=True)

    longitude = Column(Float, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )


# ------------------------------------
# Admin Table
# ------------------------------------
class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(
        String,
        unique=True,
        nullable=False
    )

    password = Column(
        String,
        nullable=False
    )

    is_admin = Column(
        Boolean,
        default=True
    )


# ------------------------------------
# Complaint History Table
# ------------------------------------
class ComplaintHistory(Base):
    __tablename__ = "complaint_history"

    id = Column(Integer, primary_key=True, index=True)

    complaint_id = Column(Integer, nullable=False)

    status = Column(String, nullable=False)

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )