import asyncio
from aiogram import Bot, Dispatcher
from aiogram.filters import Command
from aiogram import types
from config import TELEGRAM_BOT_TOKEN


bot = Bot(token=TELEGRAM_BOT_TOKEN)
dp = Dispatcher()


async def send_message_to_user(user_id: int, text: str):
    await bot.send_message(chat_id=user_id, text=text)


@dp.message(Command("start"))
async def send_welcome(message: types.Message):
    user_id = message.chat.id
    await message.reply(f" Ваш ID: {user_id}.")


async def start():
    bot = Bot(token=TELEGRAM_BOT_TOKEN)
    dp = Dispatcher()
    dp.message.register(send_welcome)
    try:
        await dp.start_polling(bot)
        
    finally:
        await bot.session.close()


if __name__ == "__main__":
    asyncio.run(start())