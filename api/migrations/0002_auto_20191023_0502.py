# Generated by Django 2.2.4 on 2019-10-23 05:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appuser',
            name='department_name',
            field=models.CharField(default='Computer Science and Information Systems', max_length=120),
        ),
    ]