# Generated by Django 4.2.3 on 2023-09-19 23:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0007_doctors'),
    ]

    operations = [
        migrations.AddField(
            model_name='doctors',
            name='role',
            field=models.CharField(default='doctor', max_length=200),
        ),
    ]
