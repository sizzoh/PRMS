# Generated by Django 4.2.3 on 2024-03-11 22:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0012_alter_medication_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='medication',
            name='cases',
        ),
    ]
