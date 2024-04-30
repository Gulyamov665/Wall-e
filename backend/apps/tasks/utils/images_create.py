from rest_framework.response import Response


def images_create(images, task, model):
    if images:
        for image in images:
            model.objects.create(task=task, image=image)
        return Response({"message": "Картинки успешно загружены"})
