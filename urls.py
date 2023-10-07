from django.urls import path
from .views import dash3
from . import views


urlpatterns = [
    path('',dash3,name="nowastes_dashboard3")
]