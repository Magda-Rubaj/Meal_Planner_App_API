from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views
from . import views


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'daily_meals', views.DailyMealsViewSet)
router.register(r'shopping_list', views.ShoppingListViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('obtain-token', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('refresh-token', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]