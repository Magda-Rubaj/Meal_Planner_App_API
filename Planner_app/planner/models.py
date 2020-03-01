from django.db import models
from django import forms


class Users(models.Model):
    name = models.CharField(max_length=10)
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
    owner = models.ForeignKey(Users, on_delete=models.CASCADE)


    