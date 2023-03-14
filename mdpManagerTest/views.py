from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core import serializers
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from accounts.models import *
from twofactor.models import *
import pyotp
from datetime import datetime


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
def password(request,account_id):
    try :
        account = Account.objects.get(pk=account_id)
        context = {'account':account}
        return render(request,"password.html",context)
    except :
        return HttpResponseRedirect(reverse('passwords'))

@login_required
def passwords(request):
    try :
        accounts = Account.objects.filter(user=request.user)
    except :
        accounts = None
    context = {'accounts':accounts}
    return render(request,"passwords.html",context)

@login_required
def profile(request):
    return render(request,"profile.html")

def submit_join(request):
    request.session['username'] = request.POST['username']
    request.session['email'] = request.POST['email']
    request.session['password'] = request.POST['password']
    check_user_db = User.objects.filter(username=request.POST['username']).exists() or User.objects.filter(email=request.POST['email']).exists()
    if check_user_db :
        messages.error(request,"Username or Email already exist")
        return HttpResponseRedirect(reverse('join'))
    else :
        return HttpResponseRedirect(reverse('qr'))
   
def qr(request):
    secret = pyotp.random_base32()
    uri = pyotp.totp.TOTP(secret).provisioning_uri(name=request.session['username'], issuer_name='SecUrKey')
    context = {'secret':secret,'uri':uri}
    return render(request,"qr.html",context)

def TwoFA(request):
    username = request.session['username']
    email = request.session['email']
    password = request.session['password']
    totp = pyotp.TOTP(request.POST['key'])
    if totp.verify(request.POST['token']) :
        user = User.objects.create_user(username, email, password)
        user.save()
        user = authenticate(request, username=username, password=password)
        twofactor = TwoFactor(user=user,key=request.POST['key'])
        twofactor.save()
        login(request, user)
        return HttpResponseRedirect(reverse('passwords'))
    else :
        return HttpResponseRedirect(reverse('qr'))

def submit_signin(request):
    request.session['username'] = request.POST['username']
    request.session['password'] = request.POST['password']
    user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
    if user is not None:
        return HttpResponseRedirect(reverse('TwoFAConnect'))
    else:
        messages.error(request,"Username or Password is incorrect")
        return HttpResponseRedirect(reverse('signin'))

def TwoFAConnect(request):
    return render(request,"twofaconnect.html")
  
def submit_token(request):
    username = request.session['username']
    password = request.session['password']
    user_token = request.POST['token']
    user = authenticate(request, username=username, password=password)
    twofa = TwoFactor.objects.get(user=user)
    totp = pyotp.TOTP(twofa.key)
    if totp.verify(user_token):
        login(request, user)
        response = HttpResponseRedirect(reverse('passwords'))
        response.set_cookie('logged_in_cookie','logged_in',max_age=3600,secure=True,httponly=True)
        return response
    else :  
        return HttpResponseRedirect(reverse('TwoFAConnect'))

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

@login_required
def logout_user(request):
    response = HttpResponseRedirect(reverse('home'))
    response.delete_cookie('logged_in_cookie')
    logout(request)
    return response

@login_required
def submit_account(request):
    website = request.POST['website']
    email = request.POST['email']
    password = request.POST['password']
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    account = Account(user=request.user,title=website,username=email,password=password,website=website,creation=dt_string,last_modification=dt_string)
    account.save()
    return HttpResponseRedirect(reverse('passwords'))


@login_required
def delete_accounts(request, account_id):
    account = get_object_or_404(Account, pk=account_id)
    if request.method == "POST":
        account.delete()
        return redirect("passwords")
    return render(request, "passwords.html")


@login_required
def account_username(request,account_id):
    username = request.POST['username']
    account = Account.objects.get(pk=account_id)
    account.username = username
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    account.last_modification = dt_string
    account.save()
    return HttpResponseRedirect(reverse('password',args=[account_id]))

@login_required
def account_password(request,account_id):
    password = request.POST['password']
    account = Account.objects.get(pk=account_id)
    account.password = password
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    account.last_modification = dt_string
    account.save()
    return HttpResponseRedirect(reverse('password',args=[account_id]))

@login_required
def account_website(request,account_id):
    website = request.POST['website']
    account = Account.objects.get(pk=account_id)
    account.website = website
    now = datetime.now()
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    account.last_modification = dt_string
    account.save()
    return HttpResponseRedirect(reverse('password',args=[account_id]))

@login_required
def passwords_json(request,url):
    accounts = Account.objects.filter(user=request.user,website=url)
    data = serializers.serialize('json', accounts)
    return HttpResponse(data, content_type='application/json')
