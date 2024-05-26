from django.db.models.signals import post_save
from django.dispatch import receiver
from tasks.models import Task
from tasks.utils.task_tg_text import taks_create_text
from bot.test import run_async_task, send_messages_to_users


user_id = 24055436
users_id = [
    24055436,
    5092708098,
    -974972939,
]

@receiver(post_save, sender=Task)
def task_signal(sender, instance, created ,**kwargs):
    if created:

        return run_async_task(send_messages_to_users(users_id, taks_create_text(instance)))
    else:

        return run_async_task(send_messages_to_users(users_id, taks_create_text(instance)))