# Generated by Django 4.1.2 on 2022-10-13 07:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vendor_api', '0005_vendor_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vendor',
            name='password',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='vendor',
            name='phone_number',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]