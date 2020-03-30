from django.db import models
from django import forms
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    avatar = models.ImageField(blank=True)
    currentWeight = models.IntegerField(blank=True, default=0)
    desiredWeight = models.IntegerField(blank=True, default=0)

class Products(models.Model):
    name = models.CharField(max_length=20)
    image = models.ImageField()
    calories = models.IntegerField()
    carbohydrates = models.FloatField()
    protein = models.FloatField()
    fat = models.FloatField()
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

class DailyMeals(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    meal =  models.ForeignKey(Products, on_delete=models.CASCADE)
    date = models.IntegerField()




    