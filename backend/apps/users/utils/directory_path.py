

def upload_path_user_avatar(instance, file):
    return f"users/{instance.last_name}/avatar/{file}"