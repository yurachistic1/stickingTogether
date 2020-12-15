from django.shortcuts import render
import json
from .models import Sticker
from django.urls import reverse

# Create your views here.


def stickers(request):

    try:
        loc = request.COOKIES["storeLoc"]
        assert loc == "UK" or loc == "SG"
    except:
        loc = "UK"

    stickers = Sticker.objects.all()
    context = {"stickers": stickers, "location": loc}
    return render(request, "store/stickers.html", context)


def cart(request):

    try:
        loc = request.COOKIES["storeLoc"]
        assert loc == "UK" or loc == "SG"
    except:
        loc = "UK"

    try:
        cart = json.loads(request.COOKIES["cart"])
    except:
        cart = {}

    items = []

    for i in cart:
        # We use try block to prevent items in cart that may have been removed from causing error
        try:
            qt = cart[i]["quantity"]
            int(qt)
            product = Sticker.objects.get(name=i)
            if loc == "UK":
                qt = min(qt, product.uk_stock)
                items.append((product, qt, product.price * qt))
            else:
                qt = min(qt, product.singapore_stock)
                items.append((product, qt, product.price_sg * qt))
        except:
            pass
    context = {"items": items, "location": loc, "link": reverse("transaction_complete")}
    return render(request, "store/cart.html", context)


def complete(request):

    if request.method == "POST":

        try:
            loc = request.COOKIES["storeLoc"]
            assert loc == "UK" or loc == "SG"
        except:
            loc = "UK"

        try:
            cart = json.loads(request.COOKIES["cart"])
        except:
            cart = {}

        items = []

        for i in cart:
            # We use try block to prevent items in cart that may have been removed from causing error
            try:
                qt = cart[i]["quantity"]
                int(qt)
                product = Sticker.objects.get(name=i)

                if i == "2-in-1 Christmas Bundle":
                    handleBundle(qt, loc)

                if loc == "UK":
                    product.uk_stock = product.uk_stock - qt
                    product.save(update_fields=["uk_stock"])
                else:
                    product.singapore_stock = product.singapore_stock - qt
                    product.save(update_fields=["singapore_stock"])
            except Exception as e:
                print(e)
                pass

    context = {}
    return render(request, "store/transactionComplete.html", context)


def handleBundle(qt, loc):
    bundle = Sticker.objects.all().exclude(name="2-in-1 Christmas Bundle")

    for product in bundle:
        if loc == "UK":
            product.uk_stock = product.uk_stock - qt * 2
            product.save(update_fields=["uk_stock"])
        else:
            product.singapore_stock = product.singapore_stock - qt * 2
            product.save(update_fields=["singapore_stock"])
