# Generated by Django 4.2.3 on 2023-09-17 07:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0005_medication'),
    ]

    operations = [
        migrations.RenameField(
            model_name='medication',
            old_name='card_number',
            new_name='file_number',
        ),
    ]
