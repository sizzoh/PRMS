# Generated by Django 5.0.4 on 2024-05-24 20:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0029_payments'),
    ]

    operations = [
        migrations.RenameField(
            model_name='payments',
            old_name='name',
            new_name='payer_name',
        ),
    ]