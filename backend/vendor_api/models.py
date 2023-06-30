from email.policy import default
from django.db import models
from admin_api.models import District,City,Movie,Category
# Create your models here.

class Vendor(models.Model):
    first_name     = models.CharField(max_length=100)
    last_name      = models.CharField(max_length=100)
    email          = models.EmailField(max_length=100, unique=True)
    phone_number   = models.CharField(max_length=10,unique=True)
    password       = models.CharField(max_length=255)

    district       = models.ForeignKey(District,  on_delete=models.CASCADE,null=True) 
    city           = models.ForeignKey(City,on_delete=models.CASCADE,null=True) 
    
    create_date    = models.DateTimeField(auto_now_add=True)
    last_login     = models.DateTimeField(auto_now=True)
    modified_date  = models.DateTimeField(auto_now=True)
    is_Vendor      = models.BooleanField(default=True)
    is_Paid        = models.BooleanField(default=False)
    is_active      = models.BooleanField(default=False,blank=True)
    
    def __str__(self):
        return self.email

class VendorToken(models.Model):
    vendor_id = models.IntegerField()
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    expired_at = models.DateTimeField()

    def __str__(self):
        return str(self.vendor_id) +' '+ self.token

class Screen(models.Model):
    screen_name = models.CharField(max_length=20)
    vendor = models.ForeignKey(Vendor,on_delete=models.CASCADE,null=True) 
    total_seet = models.IntegerField()
    price=models.IntegerField(default=0)

    def __str__(self):
        return self.screen_name

class ShowTime(models.Model):
    time = models.TimeField(null=True)
    
    def __str__(self):
        return str(self.time)+'--'+str(self.id)


class ShowDate(models.Model):
    date = models.DateField()
    
    def __str__(self):
        return str(self.date)+'--'+str(self.id)

class Show(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE,null=True,blank=True)
    # screen = models.ForeignKey(Screen, on_delete=models.CASCADE,null=True,blank=True)
    screen = models.ForeignKey(Screen,on_delete=models.CASCADE,null=True,blank=True)
    date = models.ForeignKey(ShowDate, on_delete=models.CASCADE,null=True,blank=True)
    time = models.ForeignKey(ShowTime, on_delete=models.CASCADE,null=True,blank=True)
    category_name = models.ForeignKey(Category, on_delete=models.CASCADE,null=True,blank=True)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return str(self.movie)+" "+str(self.date)+" "+str(self.time)

class Seat(models.Model):
    
    seet_no = models.CharField(max_length=3,null=True,blank=False)
    show = models.ForeignKey(Show, on_delete=models.CASCADE)
    screen = models.ForeignKey(Screen, on_delete=models.CASCADE)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE,null=True,blank=True)
    booked_status = models.BooleanField(default=False)

    def __str__(self):
        return self.seet_no



