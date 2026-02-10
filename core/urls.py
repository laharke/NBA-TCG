from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('register/', views.register_view, name='register'),
    path('packs/', views.pack_view, name='packs'),
    path('duel/', views.duel_view, name='duel'),
    path('open_pack/', views.open_pack, name='open_pack'),
    path('collection/', views.collection_view, name='collection'),
    
]
