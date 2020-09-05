from django.db import models

# Create your models here.

class Sticker(models.Model):
    BEIRUTREDCROSS = 'BRC'
    CAUSES_CHOICES = [
        (BEIRUTREDCROSS, 'Beirut Red Cross'),
    ]

    name = models.CharField(max_length=30, unique=True)
    price = models.FloatField()
    description = models.TextField(default="", blank=True)
    artist = models.CharField(max_length=30)
    singapore_stock = models.IntegerField()
    uk_stock = models.IntegerField()
    cause = models.CharField(max_length=5, choices=CAUSES_CHOICES)

    def __str__(self):
        return self.name