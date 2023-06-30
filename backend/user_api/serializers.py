from rest_framework import serializers
from . models import User,BokkingTicket,BrokerCharge


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username","email",'phone_number',"password","is_active","id",]  

        extra_kwargs = {
            'password' : {'write_only' : True}
        }
    
    def validate_password(self,value):
        if len(value)<4:
            raise serializers.ValidationError("Password must be minimum 4 characters")
        else:
            return value
    def save(self):
        reg = User(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            phone_number=self.validated_data['phone_number'],
        )
        password=self.validated_data['password']
        reg.set_password(password)
        reg.save()
        return reg

class VerifyOtpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['is_active']

class BookingTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = BokkingTicket
        fields = '__all__'

class BrokerChargeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BrokerCharge
        fields = '__all__'      