from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=8)

    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'password',
            'avatar', 'kyc_verified', 'wallet_address',
            'referral_code', 'referral_earnings',
            'is_active', 'is_staff', 'date_joined'
        ]
        read_only_fields = ['id', 'referral_earnings', 'date_joined', 'is_active', 'is_staff']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
