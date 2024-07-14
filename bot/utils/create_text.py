def create_text(message: dict):
    id = message["id"]
    name = message["name"]
    created_at = message["created_at"]
    dead_line = message["dead_line"]
    classification_name = message["classification_name"]
    comments = message["comments"]
    executor_name = message["executor_profile"]["first_name"]
    executor_last_name = message["executor_profile"]["last_name"]
    priority = message["priority"]
    status = message["status"]
    return f"""  
🟢 Новая задача

🆔 Id : {id if id else None}
🎯 Название : {name if name else None}
📅 Создан : {created_at if created_at else None}
📅 Конец : {dead_line if dead_line else None}
✉️ Классификация : {classification_name if classification_name else None}
🗒️ Комментарии : {comments if comments else None}
🤵‍♂️ Исполнитель : {executor_name if executor_name else None} {executor_last_name if executor_last_name else None}
🚨 Приоритет : {priority if priority else None}
★ Статус : {status if status else None}
    """
