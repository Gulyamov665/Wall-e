from auditlog.registry import auditlog
from django.db import models
from core.models import BaseModel
from tasks.utils.directory_path import upload_path_task_images as upload_task


COMPLETED = "completed"
IN_PROCCESS = "in_proccess"
DEFERRED = "deferred"
PENDING = "pending"
REQUIRES_INFO = "requires_info"

STATUS_TYPE = (
    (COMPLETED, "завершено"),
    (IN_PROCCESS, "в процессе"),
    (DEFERRED, "отложен"),
    (PENDING, "в ожидании"),
    (REQUIRES_INFO, "требуется информация"),
)

HIGH = "high"
AVERAGE = "average"
LOW = "low"
CRITICAL = "critical"

PRIORITY_TYPE = (
    (CRITICAL, "критичный"),
    (HIGH, "высокий"),
    (AVERAGE, "средний"),
    (LOW, "низкий"),
)


class Organization(BaseModel):
    name = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.name}"


class Classification(BaseModel):
    name = models.CharField(max_length=255, unique=True)
    availability = models.BooleanField(default=True)
    organization = models.ForeignKey(
        "tasks.Organization",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="classification",
    )

    def __str__(self):
        return self.name


class Task(BaseModel):
    name = models.CharField(max_length=255, blank=True, null=True)
    start_time = models.DateTimeField(blank=True, null=True)
    dead_line = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=255, default=PENDING, choices=STATUS_TYPE)
    executor = models.ForeignKey(
        "users.UserModel",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="executor",
    )
    observers = models.ManyToManyField(
        "users.UserModel", blank=True, related_name="observers"
    )
    comments = models.TextField(
        null=True,
        blank=True,
    )
    priority = models.CharField(max_length=255, default=AVERAGE, choices=PRIORITY_TYPE)
    classification = models.ForeignKey(
        "tasks.Classification", null=True, blank=True, on_delete=models.CASCADE
    )
    organization = models.ForeignKey(
        "tasks.Organization",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="task_organization",
    )

    def __str__(self):
        return self.name


auditlog.register(Task)


class TaskImages(BaseModel):
    image = models.ImageField(upload_to=upload_task, null=True, blank=True)
    task = models.ForeignKey(
        "tasks.Task",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="task_images",
    )


class TaskComments(BaseModel):
    task = models.ForeignKey(
        "tasks.Task",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="task_comments",
    )
    comment = models.TextField(null=True, blank=True)

    # def __str__(self):
    # return f"{self.task.name} | {self.comment}"


class CommentImages(BaseModel):
    task = models.ForeignKey(
        "tasks.TaskComments",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="comment_image",
    )
    image = models.FileField(upload_to="comment_photo/", null=True, blank=True)
