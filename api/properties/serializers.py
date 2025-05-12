from rest_framework import serializers
from .models import Property, PropertyImage, PropertyFeature

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image']

class PropertyFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyFeature
        fields = ['id', 'feature']

class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    features = PropertyFeatureSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = [
            'id', 'title', 'location', 'price', 'price_per_token',
            'total_tokens', 'available_tokens', 'description',
            'roi', 'rental_yield', 'type', 'status', 'funding_progress',
            'images', 'features'
        ]
