from rest_framework import viewsets, permissions
from .models import Investment
from .serializers import InvestmentSerializer, PortfolioSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class InvestmentViewSet(viewsets.ModelViewSet):
    serializer_class = InvestmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Investment.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def portfolio(self, request):
        investments = self.get_queryset()
        total_invested = sum(i.investment_amount for i in investments)
        total_earnings = sum(i.earnings for i in investments)
        total_properties = investments.values('property').distinct().count()
        total_tokens = sum(i.tokens_owned for i in investments)

        data = {
            'total_invested': total_invested,
            'total_earnings': total_earnings,
            'total_properties': total_properties,
            'total_tokens': total_tokens,
            'investments': InvestmentSerializer(investments, many=True).data
        }

        return Response(PortfolioSerializer(data).data)
