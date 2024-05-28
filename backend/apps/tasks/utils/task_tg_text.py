def taks_create_text(data, task):
    return f"""  
{task}

🆔 Id : http://localhost:5173/task/{data.id}
🎯 Название : {data.name}
📅 Создан : {data.created_at}
📅 Конец : {data.dead_line}
✉️ Классификация : {data.classification}
🗒️ Комментарии : {data.comments}
🤵‍♂️ Исполнитель : {data.executor}
🚨 Приоритет : {data.priority}
★ Статус : {data.status}
    """


def taks_update_text(data, task, changes=None):
    return f"""  
{task}

🆔 Id : http://localhost:5173/task/{data.id}
🎯 Название : изменилось от {changes['name']['old'] if changes['name']['old'] else data.name} на {changes['name']['new'] if changes['name']['new'] else data.name}
📅 Создан : {data.created_at}
📅 Конец : {data.dead_line}
✉️ Классификация : {data.classification}
🗒️ Комментарии : {data.comments}
🤵‍♂️ Исполнитель : {data.executor}
🚨 Приоритет : {data.priority}
★ Статус : {data.status}
    """

# 📅 Создан : {data.created_at.strftime("%Y-%m-%d %H:%M:%S")}
# 📅 Конец : {data.dead_line.strftime("%Y-%m-%d %H:%M:%S")}