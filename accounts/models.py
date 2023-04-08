from django.db import models
from django.contrib.auth.models import User

class Account(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    # logo = models.ImageField()
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=255)
    website = models.CharField(max_length=50)
    creation = models.CharField(max_length=50)
    last_modification = models.CharField(max_length=50)
    