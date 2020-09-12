from django.shortcuts import render
import json
from .models import Sticker

# Create your views here.

def stickers(request):

     try:
          loc = request.COOKIES['storeLoc']
          assert loc == 'UK' or loc == 'SG'
     except:
          loc = "UK"

     stickers = Sticker.objects.all()
     context = {'stickers': stickers, 'location': loc}
     return render(request, 'store/stickers.html', context)

def cart(request):

     try:
          loc = request.COOKIES['storeLoc']
          assert loc == 'UK' or loc == 'SG'
     except:
          loc = "UK"
     
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
               if loc == 'UK':
                    qt = min(qt, product.uk_stock)
                    items.append((product, qt, product.price * qt))
               else:
                    qt = min(qt, product.singapore_stock)
                    items.append((product, qt, product.price_sg * qt))
          except:
               pass
     context = {'items':items, 'location': loc}
     return render(request, 'store/cart.html', context)