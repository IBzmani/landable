
from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrAdmin(BasePermission):
    """
    Custom permission: only allow owners or admins to modify the user object.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions allowed to any authenticated user.
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated

        # Write permissions only for admin or the user themself.
        return request.user.is_staff or obj == request.user
