from django.shortcuts import render
from .forms import *

# Create your views here.

def home(request):
     context = {}
     return render(request, 'generalpages/home.html', context)

def about(request):
      context = {}
      return render(request, 'generalpages/about.html', context)

def causes(request):
     context = {}
     return render(request, 'generalpages/causes.html', context)

def artists(request):
      context = {}
      return render(request, 'generalpages/artists.html', context)

def contacts(request):

      if request.method == 'POST':
        form = InquiryForm(request.POST)
        if form.is_valid():
            form.save()

      context = {}
      return render(request, 'generalpages/contacts.html', context)
