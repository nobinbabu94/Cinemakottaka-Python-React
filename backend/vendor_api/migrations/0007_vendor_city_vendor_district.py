# Generated by Django 4.1.2 on 2022-10-19 11:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('admin_api', '0003_alter_city_city'),
        ('vendor_api', '0006_alter_vendor_password_alter_vendor_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='vendor',
            name='City',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='admin_api.city'),
        ),
        migrations.AddField(
            model_name='vendor',
            name='district',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='admin_api.district'),
        ),
    ]