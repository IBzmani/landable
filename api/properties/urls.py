from rest_framework.routers import DefaultRouter
from django.urls import path, include

from properties.views import PropertyViewSet


router = DefaultRouter()
router.register('', PropertyViewSet)

urlpatterns = [
    path('', include(router.urls)),   
]