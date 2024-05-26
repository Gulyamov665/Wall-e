def taks_create_text(data):
    # name = data.get("name", None)
    # classification_name = data.get("classification", None)
    # comments = data.get("comments", "Коментов нет")
    # created_at = data.get("start_time", None)
    # priority = data.get("priority", None)
    # status = data.get("status", None)
    # executor = data.get("executor", None)
    # dead_line = data.get("dead_line", None)

    return f"""  
🟢 Новая Задача

🎯 Название : {data.name}
📅 Создан : {data.created_at}
📅 Конец : {data.dead_line}
✉️ Классификация : {data.classification}
🗒️ Комментарии : {data.comments}
🤵‍♂️ Исполнитель : {data.executor}
🚨 Приоритет : {data.priority}
★ Статус : {data.status}
    """