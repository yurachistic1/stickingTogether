# Generated by Django 3.1.1 on 2020-10-18 10:30

from django.db import migrations, models
import store.models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0007_auto_20201018_1028'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stickerimage',
            name='image',
            field=models.ImageField(upload_to=store.models.image_directory_path),
        ),
    ]