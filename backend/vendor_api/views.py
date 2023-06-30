import email
import datetime
from datetime import time
from unicodedata import category
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import VendorSerializer
from .models import Screen, Show, ShowTime, Vendor,VendorToken,Seat,District,City
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse

import datetime
from . authentication import JWTVendorAuthentication,create_access_token,create_refresh_token,decode_refresh_token

from rest_framework import exceptions
from django.contrib.auth.hashers import check_password

from django.core.mail import send_mail

from admin_api.models import City,Cityenquery, Movie,Category
from admin_api.serializers import CityenquerySerializer,DistrictSerializer,CitySerializer

from .serializers import ShowTimeSerializer,ShowDateSerializer,ScreenSerializer,ShowSerializer,SeatSerializer

# Create your views here.

# class VendorRegister(APIView):
#     permission_classes=[AllowAny]
#     serializer_classes =VendorSerializer
    
#     def post(self, request):
#         data = request.data
        
#         serializer = self.serializer_classes(data=data)

#         if serializer.is_valid():
#             serializer.save()

#             print(serializer.data)

#             mailingemail=data['email']
#             print(mailingemail)
            
#             send_mail('Hello  ',
#             'Thank You For Registering on CINEMA KOTTAKA ,Your Vendor Application is underprocess ',
#             'ashrafchekintakath@gmail.com'
#             ,[mailingemail]   
#             ,fail_silently=False)

            
#             response={
#                 "data" : serializer.data
#             }
            

#             return Response(data= response, status = status.HTTP_201_CREATED)
        
#         return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class GetDistrictAll(APIView):
    def get(self, request):
        try:
            district = District.objects.all()
            city = City.objects.all()
            serializer =DistrictSerializer(district,many=True) 
            cityserializer = CitySerializer(city,many=True)
            return JsonResponse({"district":serializer.data,"city":cityserializer.data})
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)



class VendorRegister(APIView):
    permission_classes=[AllowAny]
    
    
    def post(self, request):

        """ required field : first_name - string, last_name - string, email - email, phone_number - 10 digit number, password - string, district - district id, city - city id or else other & cityenqueryname - string """

        try:
            data = request.data
            

            print('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
            enq=data['city']
            cityvalue = City.objects.get(id=enq)
            print(cityvalue.city)

            print('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')

            if cityvalue.city == 'other':
                print('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
                print('--------------------------------')
                print(data['cityenqueryname'])
                print(data['email'])
                print('--------------------------------')
                # newcityenquery = Cityenquery.objects.create(
                #     cityenqueryname = data['othercityname'],
                #     email = data['email']

                # )
                # newcityenquery.save()
                # print(newcityenquery)

                serializer = CityenquerySerializer(data=data)
                if serializer.is_valid():
                    serializer.save()

                    print('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')


                    response={
                        "data" : "your reuest for new cities has been sent to Admin. We will inform you soon"
                        }
                    

                    return Response(data= response, status = status.HTTP_201_CREATED)
                return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            else:
                serializer = VendorSerializer(data=data)

                if serializer.is_valid():
                    serializer.save()
                    mailingemail=data['email']
                    print(mailingemail)
                    
                    send_mail('Hello  ',
                    'Thank You For Registering on CINEMA KOTTAKA ,Your Vendor Application is underprocess ',
                    'enteprojectemail@gmail.com'
                    ,[mailingemail]   
                    ,fail_silently=False)

                    
                    response={
                        "data" : serializer.data
                    }
                    

                    return Response(data= response, status = status.HTTP_201_CREATED)
                
                return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class LoginVendorAPIView(APIView):
    def post(self, request):

        """ required field : email - email, password - string"""
        try:
            email = request.data['email']
            givenpassword = request.data['password']
            print('*****************************')
            print(email,'---------',givenpassword)
            print('*****************************')
            
            vendor = Vendor.objects.filter(email=email).first()
            print(vendor,"123")
            if vendor is None:
                response = Response()
            
                response.data={
                    'message':'Invalid email','status':status.HTTP_400_BAD_REQUEST
                }
                return response


            storedpassword = str(vendor.password)

            print(givenpassword,'jjjj',storedpassword)

            ans = check_password(givenpassword, storedpassword)
            print(ans)


            if  not check_password(givenpassword, storedpassword) :
                response = Response()
                response.data={
                'message':'Password Inncorect','status':status.HTTP_400_BAD_REQUEST
                }
                return response  

            if vendor.is_active:
                access_token = create_access_token(vendor.id)
                refresh_token = create_refresh_token(vendor.id)

                VendorToken.objects.create(
                    vendor_id = vendor.id,
                    token= refresh_token,
                    expired_at =  datetime.datetime.utcnow()+datetime.timedelta(seconds=7),
                )

                response = Response()
                
                response.set_cookie(key='refresh_token',value=refresh_token,httponly=True)
                response.data = {
                    'token': access_token,
                    
                }
                return response
            else:
                response = Response()
                response.data={
                    'message':'Not verifiede vendor','status':status.HTTP_400_BAD_REQUEST
                }
                return response  
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class RefreshVendorAPIView(APIView):
    def post(self, request):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            id = decode_refresh_token(refresh_token)
            print(refresh_token)
            print('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
            datas = VendorToken.objects.all()
            print(datas)
            print('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
            print(' ')
            print(' ')
            print(id)
            print(' ')
            print(refresh_token)
            print(' ')
            if not  VendorToken.objects.filter(
                vendor_id=id,
                token=refresh_token,
                # expired_at__gt=datetime.datetime.now(tz=datetime.timezone.utc)
            ).exists():
                print('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
                
                raise exceptions.AuthenticationFailed('You are unauthenticated')

            access_token = create_access_token(id)
            print('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
            print(access_token)
            print('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
            return Response({
                'token':access_token
            })
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class LogoutVendorAPIView(APIView):
    def post(self, request):
        try:
            refresh_token=request.COOKIES.get('refresh_token')
            VendorToken.objects.filter(token=refresh_token).delete()
            response = Response()
            response.delete_cookie(key='refresh_token')
            response.data={
                'message':'logout'
            }
            return response 
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)



class VendorAPIView(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def get(self, request):
        try:
            print(request)
            print('koooooooooooooooooooyyyyyyyyyyyyyyy')
            vendor=request.user
            print(vendor)
            print('koooooooooooooooooooyyyyyyyyyyyyyyy')
            vendors=Vendor.objects.get(email=vendor.email)
            serializer=VendorSerializer(vendors,many=False)
            return Response(serializer.data)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class AddShowTime(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def post(self,request):
        """required field : date - year-month-day """
        try:
            data = request.data
            serializer = ShowTimeSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                
                print(serializer.data)
                
                response={
                    "data" : serializer.data
                }
                return Response(response)
            else:
                print(serializer.errors)
                return Response(serializer.errors)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)



class AddShowDate(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def post(self,request):
        """required field : time - hour:minute:second"""
        try:
            data = request.data
            serializer = ShowDateSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                
                print(serializer.data)
                
                response={
                    "data" : serializer.data
                }
                return Response(response)
            else:
                print(serializer.errors)
                return Response(serializer.errors)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class AddScreen(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def post(self,request):
        """required field : screen_name - string, total_seet - number, price- number"""
        try:
            data = request.data
            request.data._mutable=True
            vendor=request.user
            id=Vendor.objects.get(email=vendor).id
            data['vendor']=id
            data.update(request.data)
            print('----------0000000000000000----------------')
            print(data)
            serializer = ScreenSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                
                print(serializer.data)
                
                response={
                    "data" : serializer.data
                }
                return Response(response)
            else:
                print(serializer.errors)
                return Response(serializer.errors)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class UpdateScreen(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def patch(self, request,id):
        
        """required field : screen id"""
        try:
            data = request.data
            request.data._mutable=True
            vendor=request.user
            id2=Vendor.objects.get(email=vendor).id
            data['vendor']=id2
            data.update(request.data)
            screen = Screen.objects.get(id=id)
            print('^^^^^^^^^^^^^^^^^^^^^^^^')
            print(screen.vendor)
            print(vendor)
            print('00000000000000000000000000000')
            if screen.vendor==vendor:
                serializer = ScreenSerializer(screen,data=request.data,partial = True)
                if serializer.is_valid():
                    serializer.save()
                    print("Movie update Successfully")
                    return Response(serializer.data)
                else:
                    print("Movie update failed")
                    print(serializer.errors)
                    return Response(serializer.errors)
            else:
                response={
                    "messages" : 'You are not supposed to take this action',
                    
                }

                return Response(response,status=status.HTTP_400_BAD_REQUEST)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    # def delete(self, request,id):
    #     data = request.data
    #     request.data._mutable=True
    #     vendor=request.user
    #     id2=Vendor.objects.get(email=vendor).id
    #     data['vendor']=id2
    #     data.update(request.data)
    #     screen = Screen.objects.get(id=id)
    #     print('^^^^^^^^^^^^^^^^^^^^^^^^')
    #     print(screen.vendor)
    #     print(vendor)
    #     print('00000000000000000000000000000')
    #     if screen.vendor==vendor:
    #         screen.delete()
    #         return Response({'message':'Screen deleted'})
    #     else:
    #         response={
    #             "messages" : 'You are not supposed to take this action',
                
    #         }

    #         return Response(response,status=status.HTTP_400_BAD_REQUEST)

    def put(self, request,id):
        """required field : screen id"""
        try:
            data = request.data
            request.data._mutable=True
            vendor=request.user
            id2=Vendor.objects.get(email=vendor).id
            data['vendor']=id2
            data.update(request.data)
            screen = Screen.objects.get(id=id)
            print('^^^^^^^^^^^^^^^^^^^^^^^^')
            print(screen.vendor)
            print(vendor)
            print('00000000000000000000000000000')
            if screen.vendor==vendor:
                serializer = ScreenSerializer(screen,data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    print("Screen update Successfully")
                    return Response(serializer.data)
                else:
                    print("Screen update failed")
                    print(serializer.errors)
                    return Response(serializer.errors)
            else:
                response={
                    "messages" : 'You are not supposed to take this action',
                    
                }

                return Response(response,status=status.HTTP_400_BAD_REQUEST)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetAllScreen(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def get(self, request):
        try:
            vendor=request.user
            screen = Screen.objects.filter(vendor=vendor.id)
            serializer =ScreenSerializer(screen,many=True)   
            return Response(serializer.data)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetAllScreenByMovie(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def get(self, request,id):
        """required field : movie id """
        try:
            vendor=request.user
            show=Show.objects.filter(vendor=vendor.id,movie=id)
            screen = Screen.objects.filter(vendor=vendor.id)
            # serializer =ScreenSerializer(screen,many=True)   
            
            serializer =ShowSerializer(show,many=True) 
            print(serializer.data)
            print('***********')
            ans=[]
            for i in serializer.data:
                print(i['screen']) 
                ans.append(i['screen'])

            response = {
                'screen':ans,
                'showdetails': serializer.data
            }
            # return Response(serializer.data)
            # return Response(ans)
            return Response(response)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetAllScreenByShow(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def get(self, request,id):

        """required field : show id"""
        try:
            vendor=request.user
            
            show = Show.objects.filter(vendor=vendor.id,id=id)
            serializer =ShowSerializer(show,many=True)  
            print('_________________') 
            print(serializer.data)
            ans=[]
            for i in serializer.data:
                print(i['screen']) 
                ans.append(i['screen'])

            response = {
                'screen':ans,
                'showdetails': serializer.data
            }
            
            return Response(response)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class AddShow(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def post(self,request):

        """required field : movie - movie id , screen - creen id, date- date id, time - time id"""
        try:
        
            data = request.data
            request.data._mutable=True
            vendor=request.user
            id=Vendor.objects.get(email=vendor).id
            data['vendor']=id
            print('########            #############')
            movie_id=data['movie']
            category_name = Movie.objects.get(id=movie_id).category_name
            moviename = Movie.objects.get(id=movie_id)
            print(moviename)
            print('@@@@@@@@@@@@@@@@@@@@@@')
            print(moviename.movie_name)
            category_name_id = Category.objects.get(category_name=category_name).id
            print('-----        ---------')
            print(category_name)
            print(category_name_id)
            data['category_name']=category_name_id



            data.update(request.data)
            print('----------0000000000000000----------------')
            print(data)

            screen1 = data['screen']

            screen = Screen.objects.get(id=screen1)
            print('^^^^^^^^^^^^^^^^^^^^^^^^')
            print(screen.vendor)
            print(vendor)
            print('00000000000000000000000000000')
            if screen.vendor==vendor:
                y=data['time']
                print(y)
                ttt=ShowTime.objects.get(id=y)
                
                ttttime=ttt.time
                print(ttttime)
                print(type(ttttime))
            
                intervel=datetime.time(2,58,00)
                print(intervel)
                print(type(intervel))

                print('-------rough----------')

                
                
                print('_______________________')
                ttttimeseconds = (ttttime.hour * 60 + ttttime.minute) * 60 + ttttime.second
                intervelseconds = (intervel.hour * 60 + intervel.minute) * 60 + intervel.second
                print(ttttimeseconds)
                print(intervelseconds)
                print(type(ttttimeseconds))
                print(type(intervelseconds))

                print('--------------------')
                s=str(datetime.timedelta(seconds=ttttimeseconds))
                print(s)
                print(type(s))
                
                print('---------------starting time-----------')
                startingduration=ttttimeseconds-intervelseconds
                print(startingduration)
                

                startingdurationuntime=datetime.timedelta(seconds=startingduration)
                print(startingdurationuntime)
                print(type(startingdurationuntime))

                print('??????????????????????????')
                s=str(startingdurationuntime)
                

                print('---------------ending time-----------')
                endingduration=ttttimeseconds+intervelseconds
                print(endingduration)

                endingdurationuntime=datetime.timedelta(seconds=endingduration)
                print(endingdurationuntime)
                print(type(endingdurationuntime))
                print('??????????????????????????')
                e=str(endingdurationuntime)
                
                

                print('}}}}}}}}}}}}}}}}}}}}}}}}}}')
                # if not Show.objects.filter(movie=data['movie'],vendor=data['vendor'],screen=data['screen'],date=data['date'],time=data['time'],category_name=data['category_name']).exists():
                # if not Show.objects.filter(vendor=data['vendor'],screen=data['screen'],date=data['date'],time=data['time']).exists():
                if not Show.objects.filter(vendor=data['vendor'],screen=data['screen'],date=data['date'],time__time__range=[s, e]).exists():
                # if not Show.objects.filter(vendor=data['vendor'],screen=data['screen'],date=data['date'],time__time__range=['16:30:00', '22:30:00']).exists():
                    serializer = ShowSerializer(data=data)
                    if serializer.is_valid():
                        serializer.save()
                        
                        print(serializer.data)
                        
                        response={
                            "data" : serializer.data
                        }


                        




                        return Response(response)
                    else:
                        print(serializer.errors)
                        return Response(serializer.errors)
                else:
                    response={
                    "messages" : 'Show already exist',
                    
                }

                return Response(response,status=status.HTTP_400_BAD_REQUEST)
            else:
                response={
                    "messages" : 'You are not supposed to take this action',
                    
                }

                return Response(response,status=status.HTTP_400_BAD_REQUEST)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class BlockShow(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def patch(self, request,id):

        """required field : show id"""
        try:
            show = Show.objects.get(id=id)
            print(show.vendor)
            vendor=request.user
            print(vendor)
            if vendor==show.vendor:
                if show.is_active==True:
                    show.is_active=False
                else:
                    show.is_active=True
                print(show.is_active)
                serializer = ShowSerializer(show,data=request.data,partial = True)
                if serializer.is_valid():
                    serializer.save()
                    print("show action Successfully")
                    return Response(serializer.data)
                else:
                    print("show action failed")
                    print(serializer.errors)
                    return Response(serializer.errors)
            else:
                response={
                    "messages" : 'You are not supposed to take this action',
                    
                }

                return Response(response,status=status.HTTP_400_BAD_REQUEST)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetAllShows(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def get(self, request):

        try:
            vendor=request.user
            show = Show.objects.filter(vendor=vendor.id)
            serializer =ShowSerializer(show,many=True)   
            return Response(serializer.data)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetAllUpcomingShows(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def get(self, request):
        try:
            vendor=request.user
            show = Show.objects.filter(vendor=vendor.id,date__date__gte=datetime.datetime.now())
            print('**************************')
            print(show)
            serializer =ShowSerializer(show,many=True)   
            return Response(serializer.data)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetAllfinishedShows(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def get(self, request):
        try:
            vendor=request.user
            show = Show.objects.filter(vendor=vendor.id,date__date__lte=datetime.datetime.now())
            print('**************************')
            print(show)
            serializer =ShowSerializer(show,many=True)   
            return Response(serializer.data)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class GetAllShowsByMovie(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def get(self, request,id):

        """required field : movie id"""
        
        try:
            vendor=request.user
            show = Show.objects.filter(vendor=vendor.id,movie=id)
            serializer =ShowSerializer(show,many=True)   
            return Response(serializer.data)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetAllShowsByScreen(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def get(self, request,id):

        """required field : screen id"""
        try:
            vendor=request.user
            show = Show.objects.filter(vendor=vendor.id,screen=id)
            serializer =ShowSerializer(show,many=True)
            
            return Response(serializer.data)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        
class GetAllShowsByLanguage(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def get(self, request,id):

        """required field : category id"""
        try:
            vendor=request.user
            show = Show.objects.filter(vendor=vendor.id,category_name=id)
            serializer =ShowSerializer(show,many=True)
            
            return Response(serializer.data)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        
class GetAllShowsByTime(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def get(self, request,id):

        """required field : time id"""
        try:
            vendor=request.user
            show = Show.objects.filter(vendor=vendor.id,time=id)
            serializer =ShowSerializer(show,many=True)
            
            return Response(serializer.data)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetAllShowsByDate(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def get(self, request,id):

        """required field : date id"""
        try:
            vendor=request.user
            show = Show.objects.filter(vendor=vendor.id,date=id)
            serializer =ShowSerializer(show,many=True)
            
            return Response(serializer.data)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

# class AddSeat(APIView):
#     authentication_classes = [JWTVendorAuthentication]
#     def post(self,request):
        
#         data = request.data
#         request.data._mutable=True
#         vendor=request.user
#         id=Vendor.objects.get(email=vendor).id
#         data['vendor']=id
#         print('########            #############')
        


        
#         data.update(request.data)
#         print('----------0000000000000000----------------')
#         print(data)

#         screen1 = data['screen']
#         show1=data['show']
#         screen = Screen.objects.get(id=screen1)
#         show = Show.objects.get(id=show1)
#         print('^^^^^^^^^^^^^^^^^^^^^^^^')
#         print(screen.vendor)
#         print(show.vendor)
#         print(vendor)
        
#         print('00000000000000000000000000000')
#         if screen.vendor==vendor and show.vendor==vendor:
            
#             serializer = SeatSerializer(data=data)
#             if serializer.is_valid():
#                 serializer.save()
                
#                 print(serializer.data)
                
#                 response={
#                     "data" : serializer.data
#                 }
#                 return Response(response)
#             else:
#                 print(serializer.errors)
#                 return Response(serializer.errors)
        
#         else:
#             response={
#                 "messages" : 'You are not supposed to take this action',
                
#             }

#             return Response(response,status=status.HTTP_400_BAD_REQUEST)


class AddSeat(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def post(self,request):
        
        """required field : seet_no-1, show-show id, screen-screen id"""
        try:
            data = request.data
            request.data._mutable=True
            vendor=request.user
            id=Vendor.objects.get(email=vendor).id
            data['vendor']=id
            print('########            #############')
            


            
            data.update(request.data)
            print('----------0000000000000000----------------')
            print(data)

            screen1 = data['screen']
            show1=data['show']
            screen = Screen.objects.get(id=screen1)
            show = Show.objects.get(id=show1)
            print('^^^^^^^^^^^^^^^^^^^^^^^^')
            print(screen.vendor)
            print(show.vendor)
            print(vendor)
            
            print('00000000000000000000000000000')
            if screen.vendor==vendor and show.vendor==vendor:
                
                for i in range(1,screen.total_seet+1):
                    if not Seat.objects.filter(seet_no=i,show=data['show'],screen=data['screen'],vendor=data['vendor'],).exists():
                        data['seet_no']=i
                        data.update(request.data)
                        serializer = SeatSerializer(data=data)
                        if serializer.is_valid():
                            serializer.save()
                            
                            print(serializer.data)
                            
                            
                        else:
                            print(serializer.errors)
                            return Response(serializer.errors)
                    else:
                        response={
                            "messages" : 'seat already added',
                    
                        }

                        return Response(response)
                responses={
                    "messages" : 'seat added',
                    
                }

                return Response(responses)
            else:
                responsess={
                    "messages" : 'You are not supposed to take this action',
                    
                }

                return Response(responsess,status=status.HTTP_400_BAD_REQUEST)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class Bookedseatbyshow(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def get(self, request,id):

        """required field : show id"""
        
        try:
            vendor=request.user
            show  = Show.objects.get(id=id)
            if show.vendor==vendor:
                booked_seat=Seat.objects.filter(show=show.id,booked_status=True)
                serializer = SeatSerializer(booked_seat,many=True)
                
                response={
                    "data" : serializer.data
                }
                return Response(response)
                
            
            else:
                response={
                    "messages" : 'You are not supposed to take this action',
                    
                }

                return Response(response,status=status.HTTP_400_BAD_REQUEST)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class UnBookedseatbyshow(APIView):
    authentication_classes = [JWTVendorAuthentication]
    def get(self, request,id):

        """required field : show id"""
        try:
            vendor=request.user
            show  = Show.objects.get(id=id)
            if show.vendor==vendor:
                booked_seat=Seat.objects.filter(show=show.id,booked_status=False)
                serializer = SeatSerializer(booked_seat,many=True)
                
                response={
                    "data" : serializer.data
                }
                return Response(response)
                
            
            else:
                response={
                    "messages" : 'You are not supposed to take this action',
                    
                }

                return Response(response,status=status.HTTP_400_BAD_REQUEST)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)