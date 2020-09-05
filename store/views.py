from django.shortcuts import render
from .models import Sticker

# Create your views here.

def stickers(request):
     stickers = Sticker.objects.all()
     context = {'stickers': stickers}
     return render(request, 'store/stickers.html', context)

def cart(request):
     context = {}
     return render(request, 'store/cart.html', context)

def checkout(request):
      context = {}
      return render(request, 'store/checkout.html', context)