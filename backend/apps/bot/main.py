from aiogram import Bot, Dispatcher, types
from aiogram.enums import ParseMode
from aiogram.filters import Command
import asyncio
import logging
from django.conf import settings


API_TOKEN = settings.BOT_TOKEN
API_URL = "http://127.0.0.1:8000/api/v1/tasks/"

bot = Bot(token=API_TOKEN)
dp = Dispatcher()


async def send_message_to_user(user_id: int, text: str):
    await bot.send_message(chat_id=user_id, text=text)


async def send_messages_to_users(user_ids: list, text: str):
    tasks = [send_message_to_user(user_id, text) for user_id in user_ids]
    await asyncio.gather(*tasks)


# def run_async_task(task):
#     loop = None
#     try:
#         loop = asyncio.get_event_loop()
#     except RuntimeError as e:
#         if "There is no current event loop in thread" in str(e):
#             loop = asyncio.new_event_loop()
#             asyncio.set_event_loop(loop)
#     if loop.is_closed():
#         loop = asyncio.new_event_loop()
#         asyncio.set_event_loop(loop)
#     loop.run_until_complete(task)


def run_async_task(task):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(task)
    loop.close()


@dp.message(Command("start"))
async def send_welcome(message: types.Message):
    user_id = message.chat.id
    await message.reply(
        f"Здарова! Ваш ID: {user_id}. Используйте команду /items для получения списка предметов."
    )


async def main():
    logging.basicConfig(level=logging.INFO)
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
