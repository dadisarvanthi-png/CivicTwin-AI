from fastapi_mail import FastMail, MessageSchema, ConnectionConfig

conf = ConnectionConfig(
    MAIL_USERNAME="dadisarvanthi@gmail.com",
    MAIL_PASSWORD="nxvscxmvnjbvglrc",
    MAIL_FROM="dadisarvanthi@gmail.com",
    MAIL_SERVER="smtp.gmail.com",
    MAIL_PORT=465,
    MAIL_SSL_TLS=True,
    MAIL_STARTTLS=False,
    USE_CREDENTIALS=True,
)

async def send_status_email(name, email, status):

    print("Function started")

    message = MessageSchema(
        subject="Complaint Status Updated",
        recipients=[email],
        body=f"Hello {name}\nStatus: {status}",
        subtype="plain",
    )

    print("Message created")

    fm = FastMail(conf)

    print("Sending...")

    await fm.send_message(message)

    print("SUCCESS")