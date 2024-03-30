# Generated by Django 4.2.3 on 2023-09-16 20:03

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0002_customers'),
    ]

    operations = [
        migrations.CreateModel(
            name='Lab_result',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sample_date', models.DateTimeField(default=datetime.datetime(2023, 9, 16, 20, 3, 20, 188980, tzinfo=datetime.timezone.utc))),
                ('sample_date_returned', models.DateTimeField(default=datetime.datetime(2023, 9, 16, 20, 3, 20, 188980, tzinfo=datetime.timezone.utc))),
                ('result_date', models.DateTimeField(default=datetime.datetime(2023, 9, 16, 20, 3, 20, 188980, tzinfo=datetime.timezone.utc))),
                ('copies', models.IntegerField()),
                ('eac_start_date', models.DateField(default=datetime.datetime(2023, 9, 16, 20, 3, 20, 188980, tzinfo=datetime.timezone.utc))),
                ('eac_end_date', models.DateField(default=datetime.datetime(2023, 9, 16, 20, 3, 20, 188980, tzinfo=datetime.timezone.utc))),
                ('date_second_test', models.DateField(default=datetime.datetime(2023, 9, 16, 20, 3, 20, 188980, tzinfo=datetime.timezone.utc))),
                ('vital_name', models.TextField(blank=True, max_length=100)),
                ('date_taken', models.DateField()),
                ('rate', models.FloatField()),
            ],
        ),
    ]
