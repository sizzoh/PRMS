# Generated by Django 4.2.3 on 2023-09-17 06:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0004_appointment_alter_lab_result_date_second_test_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Medication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('card_number', models.IntegerField()),
                ('id_number', models.IntegerField()),
                ('name', models.CharField(max_length=100)),
                ('dof', models.DateField()),
                ('age', models.IntegerField()),
                ('weight', models.FloatField()),
                ('date', models.DateField()),
                ('cases', models.CharField(max_length=100)),
                ('case_description', models.TextField(max_length=500)),
                ('description', models.TextField(max_length=500)),
                ('full_name', models.CharField(max_length=100)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('date_new', models.DateField()),
                ('weight_new', models.FloatField()),
                ('case_new', models.CharField(max_length=200)),
                ('case_description_new', models.TextField()),
                ('full_name_new', models.CharField(max_length=100)),
                ('description_new', models.TextField()),
                ('start_date_new', models.DateField()),
                ('end_date_new', models.DateField()),
            ],
        ),
    ]