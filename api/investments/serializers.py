from rest_framework import serializers
from .models import Investment
from properties.serializers import PropertySerializer

class InvestmentSerializer(serializers.ModelSerializer):
    property_title = serializers.CharField(source='property.title', read_only=True)
    property_image = serializers.SerializerMethodField()

    class Meta:
        model = Investment
        fields = [
            'id', 'property', 'property_title', 'property_image',
            'tokens_owned', 'investment_amount', 'purchase_date',
            'earnings', 'roi'
        ]

    def get_property_image(self, obj):
        first_image = obj.property.images.first()
        return first_image.image.url if first_image else None


class PortfolioSerializer(serializers.Serializer):
    total_invested = serializers.DecimalField(max_digits=15, decimal_places=2)
    total_earnings = serializers.DecimalField(max_digits=15, decimal_places=2)
    total_properties = serializers.IntegerField()
    total_tokens = serializers.IntegerField()
    investments = InvestmentSerializer(many=True)
