from rest_framework import serializers
from planner.models import Users, Products


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'currentWeight',
            'desiredWeight',
        )
        model = Users
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'calories',
            'carbohydrates',
            'protein',
            'fat',
            'owner',
        )
        model = Products
