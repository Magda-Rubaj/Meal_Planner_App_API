from rest_framework import generics, viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from .models import CustomUser, Products, DailyMeals, ShoppingListItem
from .serializers import CustomUserSerializer, ProductSerializer, DailyMealSerializer, ShoppingListSerializer
from .permissions import IsPostOrAuth
from django_filters.rest_framework import DjangoFilterBackend


class UserViewSet(viewsets.ModelViewSet):
    #permission_classes = (IsPostOrAuth, )
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer   
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer   
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['owner']

class DailyMealsViewSet(viewsets.ModelViewSet):
    queryset = DailyMeals.objects.all()
    serializer_class = DailyMealSerializer 
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['owner', 'date']

class ShoppingListViewSet(viewsets.ModelViewSet):
    queryset = ShoppingListItem.objects.all()
    serializer_class = ShoppingListSerializer 