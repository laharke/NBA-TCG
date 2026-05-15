#Esto tiene que setar en el root para andar, no estoy seguro si el django.setup() 

import os
import django
import json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "nba_tcg.settings")
django.setup()

from core.models import Card
from django.conf import settings

file_path = os.path.join(
    settings.BASE_DIR,
    "core",
    "static",
    "data",
    "players.json"
)

with open(file_path) as f:
    data = json.load(f)

for c in data:
    Card.objects.update_or_create(
        card_id=c["id"],
        defaults={
            "name": c["name"],
            "image": c["image"],
            "team": c["team"],
            "rarity": c["rarity"],
            "border1": c["border1"],
            "border2": c["border2"],
            "holo": c["holo"] == "true"
        }
    )

print("Cards imported ✅")
