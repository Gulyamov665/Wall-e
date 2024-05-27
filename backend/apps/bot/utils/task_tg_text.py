def taks_create_text(data, task):
    # name = data.get("name", None)
    # classification_name = data.get("classification", None)
    # comments = data.get("comments", "Коментов нет")
    # created_at = data.get("start_time", None)
    # priority = data.get("priority", None)
    # status = data.get("status", None)
    # executor = data.get("executor", None)
    # dead_line = data.get("dead_line", None)
    try:
        created_at = data.created_at.strftime("%Y-%m-%d %H:%M:%S")
        dead_line = data.dead_line.strftime("%Y-%m-%d %H:%M:%S")
    except AttributeError:
        created_at = ""
        dead_line = ""
    return f"""  
{task}

🆔 Id : http://localhost:5173/task/{data.id}
🎯 Название : {data.name}
📅 Создан : {created_at}
📅 Конец : {dead_line}
✉️ Классификация : {data.classification}
🗒️ Комментарии : {data.comments}
🤵‍♂️ Исполнитель : {data.executor}
🚨 Приоритет : {data.priority}
★ Статус : {data.status}
    """
