from django.shortcuts import render

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
      context = {}
      return render(request, 'generalpages/contacts.html', context)
