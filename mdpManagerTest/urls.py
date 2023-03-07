"""mdpManagerTest URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from . import views
from two_factor.urls import urlpatterns as tf_urls


urlpatterns = [
    path('', include(tf_urls)),
    path('admin/', admin.site.urls),
    path('', views.home, name="home" ),
    path('join/', views.join, name="join" ),
    path('signin/', views.signin, name="signin" ),
    path('add_account/', views.add_account, name="add_account" ),
    path('password/<int:account_id>/', views.password, name="password" ),
    path('password/account_username/<int:account_id>/', views.account_username, name="account_username"),
    path('password/account_password/<int:account_id>/', views.account_password, name="account_password"),
    path('password/account_website/<int:account_id>/', views.account_website, name="account_website"),
    path('passwords/', views.passwords, name="passwords" ),
    path('profile/', views.profile, name="profile" ),
    path('join/submit_join/', views.submit_join, name='submit_join'),
    path('signin/submit_signin/', views.submit_signin, name='submit_signin'),
    path('profile/edit_username/', views.edit_username, name='edit_username'),
    path('profile/edit_email/', views.edit_email, name='edit_email'),
    path('profile/edit_password/', views.edit_password, name='edit_password'),
    path('profile/delete_account/', views.delete_account, name='delete_account'),
    path('logout_user/', views.logout_user, name='logout_user'),
    path('add_account/submit_account', views.submit_account, name='submit_account'),
    path('passwords/delete_accounts/<int:account_id>/', views.delete_accounts, name='delete_accounts'),
    path('passwords_json', views.passwords_json, name='passwords_json'),


]