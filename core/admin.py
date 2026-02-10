from django.contrib import admin
from .models import User, UserCard, Card

admin.site.register(User)
admin.site.register(Card)
admin.site.register(UserCard)
