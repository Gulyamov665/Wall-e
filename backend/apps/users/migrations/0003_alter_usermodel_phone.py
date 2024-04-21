# Generated by Django 5.0.4 on 2024-04-21 13:20

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_usermodel_is_manager_usermodel_is_supervisor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermodel',
            name='phone',
            field=models.CharField(blank=True, max_length=14, null=True, validators=[django.core.validators.RegexValidator(message='Введённый номер телефона неправильно. Пример +998(XX)XXX-XX-XX', regex='^(\\+998)(\\d{9})$')]),
        ),
    ]