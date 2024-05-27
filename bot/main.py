from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from bot import send_message_to_user
from pydantic_types import MessageRequest
from utils.create_text import create_text


app = FastAPI()
router = APIRouter()

origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/send_message/")
async def send_message_users(message: MessageRequest):
    text = create_text(message.dict())
    users_id = [user.chat_id for user in message.observers_profile]
    ex_id = (
        message.executor_profile.chat_id if message.executor_profile.chat_id else None
    )
    await send_message_to_user(ex_id, text)
    for user_id in users_id:
        await send_message_to_user(user_id, text)

    return {"status": "messages sent"}
