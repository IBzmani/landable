from rest_framework.routers import DefaultRouter

from django.urls import path, include

from transactions.views import TransactionViewSet


router = DefaultRouter()
router.register('', TransactionViewSet, basename='transaction')



urlpatterns = [
    path('', include(router.urls)),
    
]