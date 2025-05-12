import django
import os
import sys
import uuid
from decimal import Decimal
from datetime import datetime, timedelta

sys.path.append(os.path.dirname(os.path.abspath(__file__)))  # or modify to point to root
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'realestate.settings')
django.setup()

from users.models import CustomUser
from properties.models import Property, PropertyImage, PropertyFeature
from investments.models import Investment
from transactions.models import Transaction

# Clear old data
Transaction.objects.all().delete()
Investment.objects.all().delete()
PropertyImage.objects.all().delete()
PropertyFeature.objects.all().delete()
Property.objects.all().delete()
CustomUser.objects.all().delete()

# Users
john = CustomUser.objects.create_user(
    username='john_doe',
    email='john@example.com',
    password='password123',
    kyc_verified=True,
    wallet_address='0xABC123DEF456',
    referral_code='REF123',
    referral_earnings=Decimal('50.00')
)

jane = CustomUser.objects.create_user(
    username='jane_smith',
    email='jane@example.com',
    password='securepassword',
    kyc_verified=False,
    wallet_address='0xXYZ987LMN654',
    referral_code='REF456',
    referral_earnings=Decimal('20.00')
)

# Properties
p1 = Property.objects.create(
    title='Luxury Apartment in NYC',
    location='New York City, NY',
    price=Decimal('1000000.00'),
    price_per_token=Decimal('100.00'),
    total_tokens=10000,
    available_tokens=7500,
    description='A luxury apartment in the heart of NYC.',
    roi=Decimal('8.5'),
    rental_yield=Decimal('5.0'),
    type='residential',
    status='available',
    funding_progress=25.0
)

p2 = Property.objects.create(
    title='Commercial Plaza in LA',
    location='Los Angeles, CA',
    price=Decimal('5000000.00'),
    price_per_token=Decimal('250.00'),
    total_tokens=20000,
    available_tokens=0,
    description='A fully-funded commercial plaza in LA.',
    roi=Decimal('10.0'),
    rental_yield=Decimal('6.5'),
    type='commercial',
    status='fully-funded',
    funding_progress=100.0
)

# Property Images
PropertyImage.objects.create(property=p1, image='images/nyc_apartment.jpg')
PropertyImage.objects.create(property=p2, image='images/la_plaza.jpg')

# Property Features
PropertyFeature.objects.create(property=p1, feature='Gym')
PropertyFeature.objects.create(property=p1, feature='Swimming Pool')
PropertyFeature.objects.create(property=p2, feature='Parking Lot')
PropertyFeature.objects.create(property=p2, feature='24/7 Security')

# Investments
Investment.objects.create(
    user=john,
    property=p1,
    tokens_owned=100,
    investment_amount=Decimal('10000.00'),
    purchase_date=datetime.now() - timedelta(days=30),
    earnings=Decimal('850.00'),
    roi=Decimal('8.5')
)

Investment.objects.create(
    user=jane,
    property=p2,
    tokens_owned=50,
    investment_amount=Decimal('12500.00'),
    purchase_date=datetime.now() - timedelta(days=60),
    earnings=Decimal('1250.00'),
    roi=Decimal('10.0')
)

# Transactions
Transaction.objects.create(
    user=john,
    type='deposit',
    amount=Decimal('20000.00'),
    date=datetime.now() - timedelta(days=31),
    status='completed',
    details='Initial deposit'
)

Transaction.objects.create(
    user=jane,
    type='investment',
    amount=Decimal('12500.00'),
    date=datetime.now() - timedelta(days=60),
    status='completed',
    details='Investment in LA Plaza'
)

print("Database seeded successfully.")
