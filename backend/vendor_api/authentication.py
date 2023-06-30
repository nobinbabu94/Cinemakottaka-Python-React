import jwt,datetime
from . models import Vendor
from rest_framework.authentication import BaseAuthentication,get_authorization_header

from rest_framework import exceptions

# MIDDLEWARE for user authentication class

class JWTVendorAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth = get_authorization_header(request).split()
        print('*********************************')
        print(auth)
        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            print('----------------------')
            print(token)
            print('----------------------')
            id = decode_access_token(token)
            print(id)
            print('---------**********-------------')
            vendor = Vendor.objects.get(pk=id)
            print(vendor)
            print('------*********----------')
            return (vendor, None)
        raise exceptions.AuthenticationFailed('unauthenticated')

def create_access_token(id):
    return jwt.encode({
        'vendor_id':id,
        
        'exp':datetime.datetime.utcnow() + datetime.timedelta(days=30), # token expiry time
        'iat':datetime.datetime.utcnow() # token obtain time
         },'access_secret',algorithm='HS256')


def decode_access_token(token):
    try:
        payload = jwt.decode(token,'access_secret',algorithms='HS256')
        return payload['vendor_id']
    except Exception as e:
        print(e)
        raise exceptions.AuthenticationFailed('unauthenticated')


def create_refresh_token(id):
    return jwt.encode({
        'vendor_id':id,
        'exp':datetime.datetime.utcnow() + datetime.timedelta(days=7),
        'iat':datetime.datetime.utcnow()
         },'refresh_secret',algorithm='HS256')
   
def decode_refresh_token(token):
    try:
        payload = jwt.decode(token,'refresh_secret',algorithms='HS256')
        return payload['vendor_id']
    except:
        raise exceptions.AuthenticationFailed('unauthenticated')