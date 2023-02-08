from django.db import models

class User(models.Model):
    username = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=50)

class Account(models.Model):
    title = models.CharField(max_length=50)
    logo = models.ImageField()
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    website = models.CharField(max_length=50)
    creation = models.CharField(max_length=50)
    last_modification = models.CharField(max_length=50)
