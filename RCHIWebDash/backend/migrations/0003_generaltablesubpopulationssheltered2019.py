# Generated by Django 2.2.6 on 2019-11-17 18:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_generaltablesubpopulations2019'),
    ]

    operations = [
        migrations.CreateModel(
            name='GeneralTableSubpopulationsSheltered2019',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('category', models.CharField(max_length=100)),
                ('subpopulation', models.CharField(max_length=100)),
                ('total', models.IntegerField()),
            ],
        ),
    ]