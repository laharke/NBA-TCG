import json
from django.conf import settings
from pathlib import Path
from core.models import UserCard
import os




CARDS_PATH = Path(settings.BASE_DIR) / "static/data/players.json"


def load_cards():

    with open(CARDS_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def get_card(card_id):

    cards = load_cards()

    for card in cards:
        if card["id"] == card_id:
            return card

    return None

def add_card(user, card):
    

    uc, created = UserCard.objects.get_or_create(
        user=user,
        card_id=card
    )

    if not created:
        uc.quantity += 1

    uc.save()

def get_inventory(user):
    
    file_path = os.path.join(
        settings.BASE_DIR,
        'core',
        'static',
        'data',
        'players.json'
    )
    with open(file_path, 'r') as file:
        cards = json.load(file)
    print(cards[0])

    user_cards = UserCard.objects.filter(user=user)

    list_id = []
    for card in user_cards:
        list_id.append[card.card_id]



    inventory = []
    


    # Tengo que leer el archivo player.json y agarrar 5 players randomly dsp, por ahora vamos a agarrar los primeros 5
    

    user_cards = UserCard.objects.filter(user=user)
    print(user_cards)
    print(user_cards[0].card_id)
    print(user_cards[0].quantity)

    for uc in user_cards:

        card_data = get_card(uc.card_id)

        inventory.append({
            "card": card_data,
            "quantity": uc.quantity
        })

    return inventory
