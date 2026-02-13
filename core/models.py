from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    last_pack_time = models.DateTimeField(null=True, blank=True)

class Card(models.Model):
    card_id = models.IntegerField(unique=True)

    name = models.CharField(max_length=100)
    image = models.CharField(max_length=255)

    team = models.CharField(max_length=100)
    rarity = models.CharField(max_length=50)

    border1 = models.CharField(max_length=7)  
    border2 = models.CharField(max_length=7)

    holo = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.rarity})"


class UserCard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    class Meta:
        unique_together = ('user', 'card')

    def __str__(self):
        return f"{self.user} — card {self.card_id} ({self.quantity})"


class Trade(models.Model):
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="created_trades"
    )

    offered_card = models.ForeignKey(
        Card,
        on_delete=models.CASCADE,
        related_name="offered_in_trades"
    )

    requested_card = models.ForeignKey(
        Card,
        on_delete=models.CASCADE,
        related_name="requested_in_trades"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.creator} offers {self.offered_card} for {self.requested_card}"
