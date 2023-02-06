from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from . import sql_queries
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib import messages

def home(request):
    #return HttpResponse("c'est bon")
    return render(request,"index.html")

def join(request):
    #sql_queries.print_users()
    
    return render(request,"join.html")

def signin(request):
    return render(request,"signin.html")

def add_account(request):
    return render(request,"add_account.html")

def password(request):
    return render(request,"password.html")

def passwords(request):
    return render(request,"passwords.html")

def profile(request):
    return render(request,"profile.html")

def submit_join(request):
    check_user_db = User.objects.filter(username=request.POST['username']).exists() or User.objects.filter(email=request.POST['email']).exists()
    if check_user_db :
        messages.error(request,"Username or Email already exist")
        return HttpResponseRedirect(reverse('join'))
    else :
        user = User.objects.create_user(request.POST['username'], request.POST['email'], request.POST['password'])
        user.save()
        return HttpResponseRedirect(reverse('passwords'))

def submit_signin(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponseRedirect(reverse('passwords'))
    else:
        # Return an 'invalid login' error message.
        ...