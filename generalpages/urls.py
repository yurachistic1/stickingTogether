from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
	path('charities/', views.charities, name="charities"),
	path('contacts/', views.contacts, name="contacts"),

]