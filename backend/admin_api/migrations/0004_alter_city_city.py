# Generated by Django 4.1.2 on 2022-10-20 05:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_api', '0003_alter_city_city'),
    ]

    operations = [
        migrations.AlterField(
            model_name='city',
            name='city',
            field=models.CharField(max_length=255),
        ),
    ]