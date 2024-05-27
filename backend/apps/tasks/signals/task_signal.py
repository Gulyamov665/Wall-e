# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from tasks.models import Task
# from apps.bot.utils.task_tg_text import taks_create_text
# from apps.bot.main import send_messages_to_users, run_async_task
# from asgiref.sync import async_to_sync
# import asyncio

# user_id = 24055436
# users_id = [
#     24055436,
#     5092708098,
#     -974972939,
# ]


# @receiver(post_save, sender=Task)
# def task_signal(sender, instance, created, **kwargs):
#     loop = asyncio.get_event_loop()
#     if created:
#         asyncio.run_coroutine_threadsafe(
#             send_messages_to_users(
#                 users_id, taks_create_text(instance, "🟢 Новая задача")
#             ),
#             loop,
#         )
#     else:
#         asyncio.run_coroutine_threadsafe(
#             send_messages_to_users(
#                 users_id, taks_create_text(instance, "🟡 Задача обновлена")
#             ),
#             loop,
#         )
