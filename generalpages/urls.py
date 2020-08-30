from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
	path('about/', views.about, name="about"),
	path('causes/', views.causes, name="causes"),
	path('artists/', views.artists, name="artists"),
	path('contacts/', views.contacts, name="contacts"),
]