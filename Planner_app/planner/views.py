from rest_framework import generics, viewsets

from .models import Users, Products
from .serializers import UserSerializer, ProductSerializer
import logging


logger = logging.getLogger(__name__)


class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer   

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer   

