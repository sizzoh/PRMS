# Generated by Django 4.2.3 on 2024-03-21 01:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0020_alter_admission_end_date_alter_admission_start_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='admission',
            name='visit_date',
            field=models.TextField(),
        ),
    ]
