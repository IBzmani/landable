from django.db import models

class Property(models.Model):
    RESIDENTIAL = 'residential'
    COMMERCIAL = 'commercial'
    INDUSTRIAL = 'industrial'
    TYPE_CHOICES = [
        (RESIDENTIAL, 'Residential'),
        (COMMERCIAL, 'Commercial'),
        (INDUSTRIAL, 'Industrial'),
    ]

    AVAILABLE = 'available'
    FULLY_FUNDED = 'fully-funded'
    COMING_SOON = 'coming-soon'
    STATUS_CHOICES = [
        (AVAILABLE, 'Available'),
        (FULLY_FUNDED, 'Fully Funded'),
        (COMING_SOON, 'Coming Soon'),
    ]

    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=15, decimal_places=2)
    price_per_token = models.DecimalField(max_digits=15, decimal_places=2)
    total_tokens = models.IntegerField()
    available_tokens = models.IntegerField()
    description = models.TextField()
    roi = models.FloatField()
    rental_yield = models.FloatField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    funding_progress = models.FloatField(default=0.0)

    def __str__(self):
        return self.title



class PropertyImage(models.Model):
    property = models.ForeignKey(Property, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='property_images/')

class PropertyFeature(models.Model):
    property = models.ForeignKey(Property, related_name='features', on_delete=models.CASCADE)
    feature = models.CharField(max_length=255)

    def __str__(self):
        return self.feature