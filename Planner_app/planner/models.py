from django.db import models
from django import forms
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    avatar = models.ImageField(blank=True, upload_to='post_images', default='defaults\default_avatar.png')
    currentWeight = models.IntegerField(blank=True)
    desiredWeight = models.IntegerField(blank=True)

class Products(models.Model):
    name = models.CharField(max_length=20)
    image = models.ImageField(blank=True, upload_to='post_images', default='defaults\default_meal.png')
    calories = models.IntegerField()
    carbohydrates = models.FloatField()
    protein = models.FloatField()
    fat = models.FloatField()
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

class DailyMeals(models.Model):
    owner =  models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    meal =  models.ForeignKey(Products, on_delete=models.CASCADE)
    date = models.IntegerField()

class ShoppingListItem(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.CharField(max_length=20)
    date = models.IntegerField()
    price = models.FloatField(blank=True)




    