from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('register/', views.register_view, name='register'),
    path('packs/', views.pack_view, name='packs'),
    path('open_pack/', views.open_pack, name='open_pack'),
    path('collection/', views.collection_view, name='collection'),
    path('trade/', views.trade_view, name='trade'),
    path('make_trade/', views.make_trade, name='make_trade'),
    path('add_trade/', views.add_trade, name='add_trade'),
    path('delete_trade/', views.delete_trade, name='delete_trade'),

    path("duel/", views.duel_view, name="duel"),
    path("duel/offline/", views.duel_offline_view, name="duel_offline"),
    #path("duel/online/", views.duel_online, name="duel_online"),

    path('get_questions_api/<int:total>/', views.get_questions_api, name='get_questions_api'),

    path("duel/offline/compute_game_results/", views.compute_game_results_offline, name="compute_game_results_offline"),

    
    
]
