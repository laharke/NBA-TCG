from django.urls import path
from .views import login_view, home_view, logout_view, register_view, pack_view, duel_view

urlpatterns = [
    path('', home_view, name='home'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('register/', register_view, name='register'),
    path('packs/', pack_view, name='packs'),
    path('duel/', duel_view, name='duel'),
]
