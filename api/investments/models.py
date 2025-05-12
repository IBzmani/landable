from django.db import models
from users.models import CustomUser
from properties.models import Property

class Investment(models.Model):
    user = models.ForeignKey(CustomUser, related_name='investments', on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    tokens_owned = models.IntegerField()
    investment_amount = models.DecimalField(max_digits=15, decimal_places=2)
    purchase_date = models.DateTimeField(auto_now_add=True)
    earnings = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)
    roi = models.FloatField(default=0.0)

    def __str__(self):
        return f"{self.user.email} - {self.property.title}"

    class Meta:
        verbose_name = 'Investment'
        verbose_name_plural = 'Investments'