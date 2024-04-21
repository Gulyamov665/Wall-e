

def upload_path_user_avatar(instance, file):
    return f"users/{instance.first_name, instance.last_name}/avatar/{file}"