# Generated by Django 3.1.1 on 2020-09-10 10:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0004_auto_20200909_1023'),
    ]

    operations = [
        migrations.AddField(
            model_name='sticker',
            name='price_sg',
            field=models.FloatField(default=3.9, verbose_name='Price (S$)'),
            preserve_default=False,
        ),
    ]
