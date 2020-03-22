from rest_framework import serializers
from planner.models import CustomUser, Products


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'username',
            'email',
            'password',
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
        print(instance)
        return instance

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