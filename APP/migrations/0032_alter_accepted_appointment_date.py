# Generated by Django 5.0.4 on 2024-06-13 17:02

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0031_accepted_appointment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accepted_appointment',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
