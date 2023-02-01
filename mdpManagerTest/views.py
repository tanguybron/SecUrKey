from django.http import HttpResponse
from django.shortcuts import render
from . import sql_queries

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