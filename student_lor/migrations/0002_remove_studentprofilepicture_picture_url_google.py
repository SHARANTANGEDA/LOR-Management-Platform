# Generated by Django 2.2.4 on 2019-11-23 17:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('student_lor', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='studentprofilepicture',
            name='picture_url_google',
        ),
    ]