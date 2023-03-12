from django.db import models
from django.contrib.auth.models import User

class TwoFactor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    key = models.CharField(max_length=250)