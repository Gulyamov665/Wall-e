import aiohttp
from aiogram import Bot, Dispatcher, types
from aiogram.enums import ParseMode
from aiogram.filters import Command
import asyncio
import logging

TOKEN = "5874502479:AAEdsmXfAwkRQLfYLnAJkKKqnR_gQ38okII"

API_TOKEN = TOKEN
API_URL = "http://127.0.0.1:8000/api/v1/tasks/"

bot = Bot(token=API_TOKEN)
dp = Dispatcher()


user_id = [24055436, 5092708098]


async def send_message_to_user(user_id: int, text: str):
    await bot.send_message(chat_id=user_id, text=text)


async def send_messages_to_users(user_ids: list, text: str):
    tasks = [send_message_to_user(user_id, text) for user_id in user_ids]
    await asyncio.gather(*tasks)


def run_async_task(task):
    loop = None
    try:
        loop = asyncio.get_event_loop()
    except RuntimeError as e:
        if "There is no current event loop in thread" in str(e):
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
    if loop.is_closed():
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
    loop.run_until_complete(task)


@dp.message(Command("start"))
async def send_welcome(message: types.Message):
    user_id = message.chat.id
    await message.reply(
        f"Здарова! Ваш ID: {user_id}. Используйте команду /items для получения списка предметов."
    )


@dp.message(Command("items"))
async def get_items(message: types.Message):
    async with aiohttp.ClientSession() as session:
        async with session.get(API_URL) as response:
            if response.status == 200:
                items = await response.json()
                tasks = items["results"]
                print(type(tasks), "ddddddd")
                items_text = "\n".join(
                    [
                        f"{item['id']} -{item['name']}: {item['comments']}"
                        for item in tasks
                    ]
                )
                await message.reply(items_text, parse_mode=ParseMode.MARKDOWN)
            else:
                await message.reply("Ошибка при получении данных.")


async def main():
    logging.basicConfig(level=logging.INFO)
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
