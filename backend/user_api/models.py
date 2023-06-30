from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin
from admin_api . models import District,City
from vendor_api . models import Screen,Show,Seat
# Create your models here.

class myAccountManager(BaseUserManager):
    def create_user(self, username,email,phone_number, password=None):
        if not email:
            raise ValueError('User must have an email address')
    
        user = self.model(
            email = self.normalize_email(email),
            username = username,
            phone_number = phone_number, 
        
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    
    def create_superuser(self, username,email,phone_number, password):
        user = self.create_user(
            email = self.normalize_email(email),
            password = password,
            username = username,
            phone_number = phone_number,
        )
        user.is_admin = True
        user.is_active = True
        user.is_staff = True
        user.is_superuser =True
        user.save(using=self.db)
        return user
        
class User(AbstractBaseUser,PermissionsMixin):
    
    username       = models.CharField(max_length=100, unique=True)
    email          = models.CharField(max_length=100, unique=True)
    phone_number   = models.CharField(max_length=100,unique=True)
    first_name   = models.CharField(max_length=100,null=True)
    last_name   = models.CharField(max_length=100,null=True)
    
    #required
    date_joined    = models.DateTimeField(auto_now_add=True)
    last_login     = models.DateTimeField(auto_now_add=True)
    is_admin       = models.BooleanField(default=False)
    is_staff       = models.BooleanField(default=False)
    is_active      = models.BooleanField(default=False)
    is_superuser  = models.BooleanField(default=False)

    district = models.ForeignKey(District, on_delete=models.CASCADE,null=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE,null=True)
    
      
    USERNAME_FIELD  = 'username'
    REQUIRED_FIELDS = ['email','phone_number']
    
    

    objects = myAccountManager()
    
    class Meta:
        verbose_name ='user'
        verbose_name_plural = 'users'
        
     
    def __str__(self):
        return self.username
    
    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, add_label):
        return True



class UserToken(models.Model):
    user_id = models.IntegerField()
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    expired_at = models.DateTimeField()

class BokkingTicket(models.Model):
    price = models.FloatField(default=0)
    brokerfee = models.FloatField(default=0)
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    show = models.ForeignKey(Show,on_delete=models.CASCADE)
    screen = models.ForeignKey(Screen,on_delete=models.CASCADE)
    seat_no = models.ManyToManyField(Seat)
    is_paid = models.BooleanField(default=False)
    payment_id = models.CharField(max_length=255,null=True)

    def __str__(self):
        return str(self.id)+ str(self.seat_no)

class BrokerCharge(models.Model):
    # ticket = models.ForeignKey(BokkingTicket, on_delete=models.CASCADE)
    ticket= models.IntegerField(unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    screen = models.ForeignKey(Screen, on_delete=models.CASCADE)
    show = models.ForeignKey(Show, on_delete=models.CASCADE)
    # brokerfee = models.ForeignKey(BokkingTicket,on_delete=models.CASCADE,null=True)
    brokerfee = models.FloatField(default=0)
    payment_id = models.CharField(max_length=255,null=True)

    def __str__(self):
        return str(Screen)