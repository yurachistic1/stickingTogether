from django.forms import ModelForm
from .models import *

class InquiryForm(ModelForm):
    class Meta:
        model = Inquiry
        fields = ['name', 'email', 'subject', 'message']