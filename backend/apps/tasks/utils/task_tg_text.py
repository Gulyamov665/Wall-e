def taks_create_text(data):
    name = data.get("name", None)
    classification_name = data.get("classification", None)
    comments = data.get("comments", "Коментов нет")
    created_at = data.get("start_time", None)
    priority = data.get("priority", None)
    status = data.get("status", None)
    executor = data.get("executor", None)
    dead_line = data.get("dead_line", None)

    return f"""  
🟢 Новая Задача

🎯 Название : {name}
📅 Создан : {created_at}
📅 Конец : {dead_line}
✉️ Классификация : {classification_name}
🗒️ Комментарии : {comments}
🤵‍♂️ Исполнитель : {executor}
🚨 Приоритет : {priority}
★ Статус : {status}
    """
