# Generated by Django 4.1.2 on 2022-10-19 16:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vendor_api', '0007_vendor_city_vendor_district'),
    ]

    operations = [
        migrations.RenameField(
            model_name='vendor',
            old_name='City',
            new_name='city',
        ),
    ]