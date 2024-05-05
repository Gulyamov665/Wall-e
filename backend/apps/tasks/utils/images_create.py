def images_create(images, task, model):
    data_list = []
    if images:
        for image in images:
            data = model.objects.create(task=task, image=image)
            data_list.append(data)
    return data_list

