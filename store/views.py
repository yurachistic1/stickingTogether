from django.shortcuts import render
import json
from .models import Sticker

# Create your views here.

def stickers(request):
     stickers = Sticker.objects.all()
     context = {'stickers': stickers}
     return render(request, 'store/stickers.html', context)

def cart(request):
     
     try:
          cart = json.loads(request.COOKIES['cart'])
     except:
          cart = {}

     items = []

     for i in cart:
          #We use try block to prevent items in cart that may have been removed from causing error
          try:
               qt = cart[i]['quantity']
               int(qt)
               product = Sticker.objects.get(name=i)
               items.append((product, qt, product.price * qt))
          except:
               pass
     context = {'items':items}
     return render(request, 'store/cart.html', context)