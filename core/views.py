from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.contrib import messages
from django.http import JsonResponse
import random
import json
from pathlib import Path
from django.conf import settings
import os
from django.utils import timezone
from .utils.cards import *
from .models import Card, Trade
from django.forms.models import model_to_dict
from django.utils.safestring import mark_safe
from django.core import serializers
from django.db.models import Exists, OuterRef, F
from django.core.paginator import Paginator


#Get custom user model
User = get_user_model()

#        messages.info(request, "Esperando confirmación")




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
        card=OuterRef('pk'),
        quantity__gt=0
    )

    collection = list(Card.objects.annotate(
        own=Exists(user_cards)
    ).order_by('card_id').values())

    context = {
        "collection": mark_safe(json.dumps(collection))
    }
    return render(request, "collection.html", context)

@login_required
def trade_view(request):

    trades = Trade.objects.select_related(
        "creator",
        "offered_card",
        "requested_card"
    ).order_by("-created_at") 

    #TESTEO DE OBTENER MY OWN TRADES
    if request.GET.get("own") == "1":
        trades = trades.filter(creator=request.user)

    paginator = Paginator(trades, 10)

    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)

    context = {
        "page_obj": page_obj
    }

    return render(request, "trade.html", context)

@login_required
def make_trade(request):



    # EJEMPLO de como tengo qeu gaurdar en user card necesiot un obejto user y un objeto card.
    # Para esto voy a necesitar los ids 
    # user = request.user
    # card = Card.objects.get(card_id=5)
    # add_card(request.user, card)
    data = json.loads(request.body)
  
    #Cuando tenga todo tengo que hacer chequeos
    # Ver si el usuario que oferta tiene la carta, si el creador tiene la carta tambien porque la pudo haber tradeado antes? puede haber creado multiples
    # trades.
    #
    tradeId = data.get("tradeId")
    creator_user = User.objects.get(id=data.get("userTradeId"))
    wants_user = request.user
    offered_card = Card.objects.get(card_id=data.get("offeredCardId"))
    requested_card = Card.objects.get(card_id=data.get("wantedCardId"))

    if not UserCard.objects.filter(user=creator_user, card=offered_card, quantity__gt=0).exists():
        messages.error(request, "Creator doesn't own that card")
        return JsonResponse({"result": "fail", "error": "Creator doesn't own card"}, status=400)

    if not UserCard.objects.filter(user=wants_user, card=requested_card, quantity__gt=0).exists():
        messages.error(request, "You don't own requested card")
        return JsonResponse({"result": "fail", "error": "You don't own requested card"}, status=400)

    # Si paso esto hay que hacer el DELETE de trades y 2 add carsd y 2 delete card  add card() / delete card
    # Si ya cumplio BORRO EL TRADE 

    #Le resto uno al CREATOR - OFFERED CARD
    UserCard.objects.filter(
        user=creator_user,
        card=offered_card
    ).update(quantity=F('quantity') - 1)

    #Le resto uno al wants - requested card
    UserCard.objects.filter(
        user=wants_user,
        card=requested_card
    ).update(quantity=F('quantity') - 1)

    #user, card
    add_card(creator_user, requested_card)
    add_card(wants_user, offered_card)


    # Una vez efecute el TRADE, lo borro de la lista
    trade = Trade.objects.get(id=tradeId)
    trade.delete()


    messages.success(request, "Cards traded successfuly")
    return JsonResponse({"result": "success"}, status=200)

@login_required
def add_trade(request):
    # Puedo hacer que si es GET, devuelve la lisat de cartas OWNEd y TOTAL CARDs para que el JS las rellene
    # Si es POST agrega el trade 

    if request.method == "GET":
        #Devuelvo todas las cartas y las cartas owned del user que no esten publicadas
        cards = list(Card.objects.all().values())

        active_trades = Trade.objects.filter(
            creator=request.user,
            offered_card=OuterRef('pk')
        )

        #SI YA LA ESTAS TRADEANDO NO PODES TRADEAR DE NUEVO
        owned = list(
        Card.objects.filter(
            usercard__user=request.user,
            usercard__quantity__gt=0
        )
        .annotate(
            already_in_trade=Exists(active_trades)
        )
        .filter(already_in_trade=False) 
        .distinct()
        .values()
        )


        return JsonResponse({"cards": cards, "owned": owned}, status=200)
    else:
        messages.success(request, "Trade created !")
        return JsonResponse({"result": "success"}, status=200)
 

@login_required
def delete_trade(request):
    data = json.loads(request.body)
    tradeId = data.get("tradeId")
    trade = Trade.objects.get(id=tradeId)
    trade.delete()
    messages.success(request, "Trade deleted !")
    return JsonResponse({"result": "success"}, status=200)



@login_required
def duel_view(request):
    return render(request, 'duel.html')