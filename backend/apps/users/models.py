from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import validate_email
from django.conf import settings
from users.utils.directory_path import upload_path_user_avatar
from users.utils.phone_validator import UZB_PHONE_VALIDATOR



class UserManager(BaseUserManager):

    def create_user(self, email, password=None):
        if not email:
            raise ValueError("Users must have a phone_number")
        user = self.model(email=email)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email=email, password=password
        )
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
    

class UserModel(AbstractBaseUser, PermissionsMixin):
    email = models.CharField(unique=True, max_length=100, validators=[validate_email])
    phone = models.CharField(max_length=14, validators=[UZB_PHONE_VALIDATOR], null=True, blank=True)
    code = models.CharField(max_length=4)
    code_expiry = models.DateTimeField(blank=True, null=True)
    max_code_try = models.CharField(max_length=2, default=settings.MAX_CODE_TRY)
    code_max_out = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_manager = models.BooleanField(default=False)
    is_supervisor = models.BooleanField(default=False)
    user_registered_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "email"
    objects = UserManager()

    def __str__(self):
        return self.email
    

class UserProfile(models.Model):

    user = models.OneToOneField(UserModel, related_name="profile", on_delete=models.CASCADE, primary_key=True,)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    avatar = models.ImageField(upload_to=upload_path_user_avatar)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"