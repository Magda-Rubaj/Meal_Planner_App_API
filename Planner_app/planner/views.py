from rest_framework import generics, viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from .models import CustomUser, Products
from .serializers import CustomUserSerializer, ProductSerializer
from .permissions import IsPostOrAuth


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsPostOrAuth, )
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer   
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer   