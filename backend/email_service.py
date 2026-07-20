from fastapi_mail import FastMail, MessageSchema, ConnectionConfig

conf = ConnectionConfig(
    MAIL_USERNAME="dadisarvanthi@gmail.com",
    MAIL_PASSWORD="nxvscxmvnjbvglrc",
    MAIL_FROM="dadisarvanthi@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
)

async def send_status_email(
    name: str,
    email: str,
    status: str,
):
    message = MessageSchema(
        subject="Complaint Status Updated",
        recipients=[email],
        body=f"""
Hello {name},

Your complaint status has been updated.

Current Status:
{status}

Thank you for using CivicTwin AI.
""",
        subtype="plain",
    )

    fm = FastMail(conf)

    await fm.send_message(message)