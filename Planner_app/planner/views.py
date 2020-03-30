from rest_framework import generics, viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from .models import CustomUser, Products, DailyMeals
from .serializers import CustomUserSerializer, ProductSerializer, DailyMealSerializer
from .permissions import IsPostOrAuth


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsPostOrAuth, )
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer   
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer   

class DailyMealsViewSet(viewsets.ModelViewSet):
    queryset = DailyMeals.objects.all()
    serializer_class = DailyMealSerializer 