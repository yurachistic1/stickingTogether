from django.shortcuts import render

# Create your views here.

def home(request):
     context = {}
     return render(request, 'generalpages/home.html', context)

def charities(request):
     context = {}
     return render(request, 'generalpages/charities.html', context)

def contacts(request):
      context = {}
      return render(request, 'generalpages/contacts.html', context)