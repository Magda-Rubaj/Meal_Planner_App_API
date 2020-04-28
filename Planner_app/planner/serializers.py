from rest_framework import serializers
from planner.models import CustomUser, Products, DailyMeals, ShoppingListItem


class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        fields = (
            'id',
            'username',
            'email',
            'password',
            'avatar',
            'currentWeight',
            'desiredWeight',
        )
        model = CustomUser
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):

        ModelClass = self.Meta.model
        instance = ModelClass.objects.create(**validated_data)
        
        if instance.password is not None:
            instance.set_password(instance.password)
            
        instance.save()
        return instance

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        fields = (
            'id',
            'name',
            'image',
            'calories',
            'carbohydrates',
            'protein',
            'fat',
            'owner',
        )
        model = Products

class DailyMealSerializer(serializers.ModelSerializer):

    class Meta:
        fields = (
            'id',
            'owner',
            'meal',
            'date'
        )
        model = DailyMeals

class ShoppingListSerializer(serializers.ModelSerializer):
    
    class Meta:
        fields = (
            'id',
            'owner',
            'content',
            'date',
            'price'
        )
        model = ShoppingListItem
