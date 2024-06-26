# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-07 07:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [("projects", "0004_auto_20170906_1045")]

    operations = [
        migrations.AlterModelOptions(
            name="billingtype", options={"ordering": ("name",)}
        ),
        migrations.RemoveIndex(
            model_name="customer", name="projects_cu_name_e0e97a_idx"
        ),
        migrations.RemoveIndex(model_name="task", name="projects_ta_name_dd9620_idx"),
        migrations.RemoveIndex(
            model_name="project", name="projects_pr_name_ac60a8_idx"
        ),
        migrations.AddField(
            model_name="billingtype",
            name="reference",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="customer",
            name="reference",
            field=models.CharField(
                blank=True, db_index=True, max_length=255, null=True
            ),
        ),
        migrations.AddField(
            model_name="project",
            name="reference",
            field=models.CharField(
                blank=True, db_index=True, max_length=255, null=True
            ),
        ),
        migrations.AddField(
            model_name="task",
            name="reference",
            field=models.CharField(
                blank=True, db_index=True, max_length=255, null=True
            ),
        ),
        migrations.AlterField(
            model_name="customer",
            name="name",
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name="project",
            name="name",
            field=models.CharField(db_index=True, max_length=255),
        ),
    ]
