from django.db import models
from tasks.utils.directory_path import upload_path_product_images
from core.models import BaseModel


class Brand(BaseModel):
    name = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.name}"


class Product(BaseModel):
    name = models.CharField(max_length=255, null=True, blank=True)
    brand = models.ForeignKey(
        "checklist.Brand", on_delete=models.CASCADE, null=True, blank=True
    )
    image = models.FileField(
        upload_to=upload_path_product_images, null=True, blank=True
    )

    def __str__(self) -> str:
        return self.name


class Checklist(BaseModel):
    product = models.ForeignKey(
        "checklist.Product",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="product",
    )
    task_id = models.ForeignKey(
        "tasks.Task",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="task_id",
    )
    task_comment = models.ForeignKey(
        "tasks.TaskComments",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="task_comment",
    )
    is_checked = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True, editable=False)
