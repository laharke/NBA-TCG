from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages

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

def pack_view(request):

    return render(request, "packs.html")

def duel_view(request):
    return render(request, 'duel.html')