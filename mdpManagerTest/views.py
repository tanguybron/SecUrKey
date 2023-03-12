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
        return HttpResponseRedirect(reverse('qr'))

@login_required    
def qr(request):
    secret = pyotp.random_base32()
    uri = pyotp.totp.TOTP(secret).provisioning_uri(name=request.user.username, issuer_name='SecUrKey')
    context = {'secret':secret,'uri':uri}
    return render(request,"qr.html",context)

@login_required
def TwoFA(request):
    totp = pyotp.TOTP(request.POST['key'])
    if totp.verify(request.POST['token']) :
        twofactor = TwoFactor(user=request.user,key=request.POST['key'])
        twofactor.save()
        return HttpResponseRedirect(reverse('passwords'))
    else :
        return HttpResponseRedirect(reverse('qr'))

def submit_signin(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponseRedirect(reverse('TwoFAConnect'))
    else:
        messages.error(request,"Username or Password is incorrect")
        return HttpResponseRedirect(reverse('signin'))

@login_required    
def TwoFAConnect(request):
    return render(request,"twofaconnect.html")

@login_required    
def submit_token(request):
    user_token = request.POST['token']
    twofa = TwoFactor.objects.get(user=request.user)
    totp = pyotp.TOTP(twofa.key)
    if totp.verify(user_token):
        return HttpResponseRedirect(reverse('passwords'))
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
    logout(request)
    return HttpResponseRedirect(reverse('home'))

@login_required
def submit_account(request):
    website = request.POST['website']
    email = request.POST['email']
    password = request.POST['password']
    account = Account(user=request.user,title=website,username=email,password=password,website=website,creation="0",last_modification="0")
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
    account.save()
    return HttpResponseRedirect(reverse('password',args=[account_id]))

@login_required
def account_password(request,account_id):
    password = request.POST['password']
    account = Account.objects.get(pk=account_id)
    account.password = password
    account.save()
    return HttpResponseRedirect(reverse('password',args=[account_id]))

@login_required
def account_website(request,account_id):
    website = request.POST['website']
    account = Account.objects.get(pk=account_id)
    account.website = website
    account.save()
    return HttpResponseRedirect(reverse('password',args=[account_id]))

@login_required
def passwords_json(request):
    accounts = Account.objects.filter(user=request.user)
    data = serializers.serialize('json', accounts)
    return HttpResponse(data, content_type='application/json')
