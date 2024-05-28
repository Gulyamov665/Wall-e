# from django.db.models.signals import post_save, pre_save
# from django.dispatch import receiver
# from tasks.models import Task
# from tasks.utils.task_tg_text import taks_create_text, taks_update_text
# from bot.test import send_messages_to_users
# import copy
# import asyncio


# user_id = 24055436
# users_id = [
#     24055436,
#     5092708098,
#     -974972939,
#     -714713997,
# ]

# # @receiver(post_save, sender=Task)
# # def task_signal(sender, instance, created ,**kwargs):
# #     if created:

# #         return run_async_task(send_messages_to_users(users_id, taks_create_text(instance)))
# #     else:
# #         print(kwargs)
# #         return run_async_task(send_messages_to_users(users_id, taks_create_text(instance)))
    


# # Словарь для хранения начального состояния объекта
# original_instance = {}

# @receiver(pre_save, sender=Task)
# def before_task_save(sender, instance, **kwargs):
#     if instance.pk:
#         try:
#             original = Task.objects.get(pk=instance.pk)
#             original_instance[instance.pk] = copy.deepcopy(original)
#         except Task.DoesNotExist:
#             original_instance[instance.pk] = None


# # @receiver(post_save, sender=Task)
# # def after_task_save(sender, instance, created, **kwargs):
# #     original = original_instance.pop(instance.pk, None)
    
# #     if created:
# #         # Логика для нового объекта
# #         return asyncio.run(
# #             send_messages_to_users(
# #                 users_id, taks_create_text(instance, "🟢 Новая задача")
# #             )
# #         )
# #     else:
# #         # Логика для обновленного объекта
# #         if original:
# #             changes = {}
# #             for field in instance._meta.fields:
# #                 field_name = field.name
# #                 original_value = getattr(original, field_name)
# #                 new_value = getattr(instance, field_name)
# #                 if original_value != new_value:
# #                     changes[field_name] = {
# #                         'old': original_value,
# #                         'new': new_value
# #                     }
            
# #             # print(changes['classification']['old'])
# #             # Пример использования изменений
# #             # for field, change in changes.items():
# #                 # print(f'Поле {field} изменилось с {change["old"]} на {change["new"]}')
# #             return asyncio.run(
# #             send_messages_to_users(
# #                 users_id, taks_update_text(instance, "🟡 Задача обловлена", changes)
# #             )
# #         )




# import asyncio
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from tasks.models import Task
# from tasks.utils.task_tg_text import taks_create_text, taks_update_text
# from bot.test import send_messages_to_users



# @receiver(post_save, sender=Task)
# def after_task_save(sender, instance, created, **kwargs):
#     original = original_instance.pop(instance.pk, None)
    
#     async def handle_task_save():
#         if created:
#             # Логика для нового объекта
#             await send_messages_to_users(
#                 users_id, taks_create_text(instance, "🟢 Новая задача")
#             )
#         else:
#             # Логика для обновленного объекта
#             if original:
#                 changes = {}
#                 for field in instance._meta.fields:
#                     field_name = field.name
#                     original_value = getattr(original, field_name)
#                     new_value = getattr(instance, field_name)
#                     if original_value != new_value:
#                         changes[field_name] = {
#                             'old': original_value,
#                             'new': new_value
#                         }
                
#                 await send_messages_to_users(
#                     users_id, taks_update_text(instance, "🟡 Задача обловлена", changes)
#                 )
    
#     # Получаем текущий event loop и создаем задачу
#     try:
#         loop = asyncio.get_event_loop()
#     except RuntimeError as e:
#         if "There is no current event loop in thread" in str(e):
#             loop = asyncio.new_event_loop()
#             asyncio.set_event_loop(loop)
#         else: 
#             raise

#     loop.create_task(handle_task_save())
