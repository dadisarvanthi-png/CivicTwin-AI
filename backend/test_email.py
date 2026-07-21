import asyncio
from utils.email_service import send_status_email

asyncio.run(
    send_status_email(
        name="sravanthi",
        email="dadisarvanthi@gmail.com",
        status="Resolved"
    )
)

print("Finished")