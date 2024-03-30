# Generated by Django 4.2.3 on 2024-03-11 07:12

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0010_rename_doctors_staff'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customers',
            name='nhci',
        ),
        migrations.AddField(
            model_name='customers',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
    ]
