from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from . import sql_queries
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib import messages

def home(request):
    #return HttpResponse("c'est bon")
    return render(request,"index.html")

def join(request):
    #sql_queries.print_users()
    return render(request,"join.html")

def signin(request):
    return render(request,"signin.html")

@login_required
def add_account(request):
    return render(request,"add_account.html")

@login_required
def password(request):
    return render(request,"password.html")

@login_required
def passwords(request):
    return render(request,"passwords.html")

@login_required
def profile(request):
    return render(request,"profile.html")

def submit_join(request):
    username = request.POST['username']
    email = request.POST['email']
    password = request.POST['password']
    check_user_db = User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists()
    if check_user_db :
        messages.error(request,"Username or Email already exist")
        return HttpResponseRedirect(reverse('join'))
    else :
        user = User.objects.create_user(username, email, password)
        user.save()
        user = authenticate(request, username=username, password=password)
        login(request, user)
        return HttpResponseRedirect(reverse('passwords'))

def submit_signin(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponseRedirect(reverse('passwords'))
    else:
        messages.error(request,"Username or Password is incorrect")
        return HttpResponseRedirect(reverse('signin'))

@login_required
def edit_username(request):
    username = request.POST["username"]
    check_user_db = User.objects.filter(username=request.POST['username']).exists()
    if check_user_db :
        messages.error(request,"Username already exists")
        return HttpResponseRedirect(reverse('profile'))
    else :
        user = request.user
        user.username = username
        user.save()
        return HttpResponseRedirect(reverse('profile'))
    
@login_required
def edit_email(request):
    new_email = request.POST["new_email"]
    verif_new_email = request.POST["verif_new_email"]
    if(new_email==verif_new_email):
        check_email_db = User.objects.filter(email=request.POST['new_email']).exists()
        if check_email_db :
            messages.error(request,"Email already exists")
            return HttpResponseRedirect(reverse('profile'))
        else :
            user = request.user
            user.email = new_email
            user.save()
            return HttpResponseRedirect(reverse('profile'))
    else :
        messages.error(request,"Verify email is incorrect")
        return HttpResponseRedirect(reverse('profile'))

@login_required
def edit_password(request):
    current_password = request.POST["current_password"]
    new_password = request.POST["new_password"]
    verif_new_password = request.POST["verif_new_password"]
    username = request.user.username
    user = authenticate(username=username,password=current_password)
    if user is not None :
        if(new_password==verif_new_password) :
            user.set_password(new_password)
            user.save()
            user = authenticate(username=username,password=new_password)
            login(request, user)
            return HttpResponseRedirect(reverse('profile'))
        else :
            messages.error(request,"Verify password is incorrect")
        return HttpResponseRedirect(reverse('profile'))
    else :
        messages.error(request,"Password incorrect")
        return HttpResponseRedirect(reverse('profile'))
    
@login_required
def delete_account(request):
    user = request.user
    user.delete()
    return HttpResponseRedirect(reverse('home'))