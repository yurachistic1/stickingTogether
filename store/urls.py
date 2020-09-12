from django.urls import path
from . import views

urlpatterns = [
	path('stickers', views.stickers, name="stickers"),
	path('cart/', views.cart, name="cart"),
	path('thank-you', views.complete, name="transaction_complete")
]