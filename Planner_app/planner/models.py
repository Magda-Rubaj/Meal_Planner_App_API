from django.db import models
from django import forms
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    currentWeight = models.IntegerField()
    desiredWeight = models.IntegerField()
    def __str__(self):
        return self.name
class Products(models.Model):
    name = models.CharField(max_length=20)
    calories = models.IntegerField()
    carbohydrates = models.FloatField()
    protein = models.FloatField()
    fat = models.FloatField()
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)


    