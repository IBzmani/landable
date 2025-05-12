from rest_framework.routers import DefaultRouter
from django.urls import path, include

from investments.views import InvestmentViewSet


router = DefaultRouter()
router.register('', InvestmentViewSet, basename='investment')


urlpatterns = [
    path('', include(router.urls)),   
]