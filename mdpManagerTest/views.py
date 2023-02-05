from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from . import sql_queries
from django.urls import reverse
from django.contrib.auth.models import User

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

def db(request):
    return render(request,"show_db.html")

def submit_join(request):
    user = User.objects.create_user(request.POST['username'], request.POST['email'], request.POST['password'])
    user.save()
    return HttpResponseRedirect(reverse('db'))