from django.db import models
from users.models import CustomUser

class Transaction(models.Model):
    DEPOSIT = 'deposit'
    WITHDRAWAL = 'withdrawal'
    INVESTMENT = 'investment'
    EARNING = 'earning'
    SALE = 'sale'

    TYPE_CHOICES = [
        (DEPOSIT, 'Deposit'),
        (WITHDRAWAL, 'Withdrawal'),
        (INVESTMENT, 'Investment'),
        (EARNING, 'Earning'),
        (SALE, 'Sale'),
    ]

    COMPLETED = 'completed'
    PENDING = 'pending'
    FAILED = 'failed'

    STATUS_CHOICES = [
        (COMPLETED, 'Completed'),
        (PENDING, 'Pending'),
        (FAILED, 'Failed'),
    ]

    user = models.ForeignKey(CustomUser, related_name='transactions', on_delete=models.CASCADE)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    details = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.email} - {self.type} - {self.amount}"
