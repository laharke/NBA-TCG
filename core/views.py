from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import JsonResponse
import random
import json
from pathlib import Path
from django.conf import settings
import os
from django.utils import timezone
from .utils.cards import *
from .models import Card
from django.forms.models import model_to_dict
from django.utils.safestring import mark_safe
from django.core import serializers
from django.db.models import Exists, OuterRef



 





def login_view(request):
    if request.user.is_authenticated:
        return redirect('/')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user:
            login(request, user)
            return redirect('/')
        else:
            return render(request, 'login.html', {
                'error': 'Usuario o contraseña incorrectos'
            })

    return render(request, 'login.html')


@login_required
def home_view(request):
    return render(request, 'index.html')


def logout_view(request):
    logout(request)
    return redirect('/login/')

def register_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        password2 = request.POST.get("password2")

        # Validaciones básicas
        if password != password2:
            messages.error(request, "Las contraseñas no coinciden")
            return redirect("register")

        if User.objects.filter(username=username).exists():
            messages.error(request, "El usuario ya existe")
            return redirect("register")

        if User.objects.filter(email=email).exists():
            messages.error(request, "El email ya está registrado")
            return redirect("register")

        # Crear usuario
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        login(request, user)  # auto-login después de registrarse
        return redirect("home")  

    return render(request, "register.html")



def open_pack(request):

    # Primero aca tengo que hacer el chequeo leyendo en base de datos si pasaron 24 horas del ultimo pack open.


    cards = list(Card.objects.all())
    cards = random.sample(cards, 5)

    for card in cards:
        add_card(request.user, card)

    request.user.last_pack_time = timezone.now()
    request.user.save()

    response_cards = [model_to_dict(card) for card in cards]   

    return JsonResponse({"cards": response_cards})

@login_required
def pack_view(request):
    return render(request, "packs.html")


@login_required
def collection_view(request):

    user_cards = UserCard.objects.filter(
        user=request.user,
        card=OuterRef('pk')
    )

    collection = list(Card.objects.annotate(
        own=Exists(user_cards)
    ).order_by('card_id').values())

    context = {
        "collection": mark_safe(json.dumps(collection))
    }
    return render(request, "collection.html", context)

@login_required
def duel_view(request):
    return render(request, 'duel.html')