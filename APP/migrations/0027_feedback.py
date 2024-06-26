# Generated by Django 4.2.3 on 2024-03-31 21:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APP', '0026_delete_custommodel'),
    ]

    operations = [
        migrations.CreateModel(
            name='feedback',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=100)),
                ('subject', models.CharField(max_length=100)),
                ('date', models.DateField(auto_now_add=True)),
                ('message', models.TextField(max_length=300)),
                ('contacts', models.IntegerField()),
            ],
        ),
    ]
