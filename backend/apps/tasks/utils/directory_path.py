def upload_path_task_images(instance, file):
    return f"task/images/{file}"


def upload_path_product_images(instance, file):
    return f"{instance.brand.name}/images/{file}"
