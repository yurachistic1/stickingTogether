from django.db import models
from django.utils import timezone
import datetime

# Create your models here.

class Inquiry(models.Model):
    
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=100)
    message = models.TextField()
    datetime = models.DateTimeField(default=timezone.now)
    status = models.BooleanField(verbose_name="Completed", default=False)

    def __str__(self):
        active = 'Completed.' if self.status else 'Active.'  
        return  active + " Subject: " + self.subject + (self.datetime).strftime(" (%x - %X)")

    class Meta:
        ordering = ['status' ,'-datetime']