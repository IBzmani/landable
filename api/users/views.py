# users/views.py

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from .models import CustomUser
from .serializers import UserSerializer
from .permissions import IsOwnerOrAdmin


class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing users.

    - Authenticated users can list and retrieve users.
    - Anyone can register (create).
    - Only the user or admin can update their data.
    - Only admin can delete users.
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        """
        Assign permissions based on action.
        """
        if self.action == 'create':
            return [AllowAny()]
        elif self.action == 'destroy':
            return [IsAdminUser()]
        elif self.action in ['update', 'partial_update']:
            return [IsOwnerOrAdmin()]
        return [IsAuthenticated()]
