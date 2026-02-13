from django.contrib import admin
from .models import User, UserCard, Card, Trade

admin.site.register(User)
admin.site.register(Card)
admin.site.register(UserCard)
admin.site.register(Trade)