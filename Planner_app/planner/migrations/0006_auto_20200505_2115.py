# Generated by Django 3.0.3 on 2020-05-05 19:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0005_auto_20200505_2115'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='avatar',
            field=models.ImageField(blank=True, default='defaults\\default_avatar.png', upload_to='post_images'),
        ),
    ]