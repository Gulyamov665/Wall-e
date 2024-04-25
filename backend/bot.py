from aiogram import Bot, Dispatcher
from aiogram.types import Message
from aiogram.filters import CommandStart
import asyncio


TOKEN = '6745626892:AAHpxxNBOizzTsKi3jatpZtsqDqdlfsTMP4'

dp = Dispatcher()

@dp.message(CommandStart())
async def start(message: Message):
    await message.answer(f"hello {message.from_user.username, message.from_user.id}")



async def main():
    bot = Bot(token=TOKEN)
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())