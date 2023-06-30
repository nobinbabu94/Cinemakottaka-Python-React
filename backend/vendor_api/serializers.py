from rest_framework import serializers
from . models import Vendor,ShowTime,ShowDate,Screen,Seat,Show
from django.contrib.auth.hashers import make_password

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ["id","first_name","last_name",'email',"phone_number","password","district","city","is_active","is_Vendor" ]  

        extra_kwargs = {
            'password' : {'write_only' : True}
        }
    
    def validate_password(self,value):
        if len(value)<4:
            raise serializers.ValidationError("Password must be minimum 4 characters")
        else:
            return value
    def validate_phone_number(self,value):
        if len(value)!=10:
            raise serializers.ValidationError("Phonenumber must be minimum 10 digits")
        else:
            return value
    def save(self):
        reg = Vendor.objects.create(
            email=self.validated_data['email'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
            phone_number=self.validated_data['phone_number'],
            # password=self.validated_data['password'], 
            password = make_password(self.validated_data['password']),
            district = self.validated_data['district'],
            city = self.validated_data['city'],
        )
        print(reg)
        
        return reg

class ShowTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShowTime
        fields = '__all__'

class ShowDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShowDate
        fields = '__all__'

class ScreenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Screen
        fields = '__all__'

class ShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = '__all__'

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = '__all__'
        # depth = 1