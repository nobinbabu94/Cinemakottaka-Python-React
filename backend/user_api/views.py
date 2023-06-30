from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from .models import User,BokkingTicket,BrokerCharge
from .serializers import UserSerializer,VerifyOtpSerializer,BookingTicketSerializer,BrokerChargeSerializer
from rest_framework.response import Response
from rest_framework import status
from . import verify
from .verify import send,check

from admin_api . models import Category,City,District,Movie
from admin_api . serializers import CategorySerializer,DistrictSerializer,CitySerializer,MovieSerializer,UpdateUserSerializer

from vendor_api . models import Show,ShowDate,ShowTime,Vendor,Seat,Screen
from vendor_api . serializers import ShowSerializer,ShowDateSerializer,ShowTimeSerializer,VendorSerializer,SeatSerializer

import requests
from django.conf import settings


import datetime
from django.contrib import auth
from . authentication import JWTUserAuthentication,create_access_token,create_refresh_token,decode_refresh_token
from . models import UserToken
from rest_framework import exceptions

import razorpay

class UserRegister(APIView):
    permission_classes=[AllowAny]
    serializer_classes = UserSerializer
    
    def post(self, request):

        """ required field : username-string, email-email, phone_number-10 digit number, password - string"""
        try:
            print('------------------------------------------')
            print(request)
            print('------------------------------------------')
            data = request.data
            print(data)
            print('------------------------------------------')
            serializer = self.serializer_classes(data=data)

            if serializer.is_valid():
                serializer.save()
                phone_number=data['phone_number']
                print(phone_number)
                send(phone_number)
                response={
                    "data" : serializer.data
                }
                

                return Response(data= response, status = status.HTTP_201_CREATED)
            
            return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class VerifyUserOtp(APIView):
    def post(self,request):

        """ required field : phone_number-10 digit number, code - string"""

        try:
            data=request.data
            phone_number=data['phone_number']
            code=data['code']
            if check(phone_number,code):
                print('hello')
                user = User.objects.get(phone_number=phone_number)   
                print(user)       
                user.is_active= True
                user.save()
                serializer = VerifyOtpSerializer(user, many=False)
                return Response(serializer.data)
            else:
                message = {'detail':'otp is not valid'}
                
                return Response(message, status=status.HTTP_400_BAD_REQUEST)
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class LoginUserAPIView(APIView):
    def post(self, request):

        """ required field : phone_number-10 digit number, password - string"""
        try:
            phone_number = request.data['phone_number']
            password = request.data['password']

            user = User.objects.filter(phone_number=phone_number,is_active=True).first()
            print(user)
            if user is None:
                response = Response()
            
                response.data={
                    'message':'Invalid phone_number','status':status.HTTP_400_BAD_REQUEST
                }
                return response

            if not user.check_password(password):
                response = Response()
            
                response.data={
                    'message':'Invalid password','status':status.HTTP_400_BAD_REQUEST
                }
                return response

            # user = auth.authenticate(phone_number=phone_number, password=password)
            # print(user)
            print('*')
            if user:
                access_token = create_access_token(user.id)
                refresh_token = create_refresh_token(user.id)

                UserToken.objects.create(
                    user_id=user.id,
                    token=refresh_token,
                    expired_at=datetime.datetime.utcnow() + datetime.timedelta(days=7)
                )

                response = Response()
                
                response.set_cookie(key='refresh_token',value=refresh_token,httponly=True)
                response.data = {
                    'token': access_token,
                    'admin': user.is_admin,
                    
                }
                return response
            else:
                response = Response()
                response.data={
                    'message':'Not verified'
                }
                return response  
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class RefreshUserAPIView(APIView):
    def post(self, request):

        try:
            refresh_token = request.COOKIES.get('refresh_token')
            id = decode_refresh_token(refresh_token)
            print(refresh_token)
            if not  UserToken.objects.filter(
                user_id=id,
                token=refresh_token,
                expired_at__gt=datetime.datetime.now(tz=datetime.timezone.utc)
            ).exists():
                raise exceptions.AuthenticationFailed('You are unauthenticated')

            access_token = create_access_token(id)
            print('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
            print(access_token)
            print('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
            return Response({
                'token':access_token
            })
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class UserAPIView(APIView):
    authentication_classes = [JWTUserAuthentication]
    def get(self,request):
        try:
            return Response(UserSerializer(request.user).data)
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class LogoutUserAPIView(APIView):
    def post(self, request):
        try:
            refresh_token=request.COOKIES.get('refresh_token')
            print('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
            print(refresh_token)
            print('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
            UserToken.objects.filter(token=refresh_token).delete()
            
            response = Response()
            try:
                response.delete_cookie(key='refresh_token')
                response.delete_cookie(key='phone_number')
            except:
                response.delete_cookie(key='refresh_token')
            response.data={
                'message':'Now you are logout'
            }
            return response
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class LoginUserWithOtpAPIView(APIView):
    def post(self, request):
        """ required field : phone_number-10 digit number """
        try:
            phone_number = request.data['phone_number']

            user = User.objects.filter(phone_number=phone_number,is_active=True).first()
            print(user)
            if user is None:
                response = Response()
            
                response.data={
                    'message':'Invalid phone_number'
                }
                return response
        

        
            if user:
                print('otp sented')
                send(phone_number)
                response = Response()
                
                response.set_cookie(key='phone_number',value=phone_number,httponly=True)
                response.data = {
                'phone_number':phone_number
                }
                return response
            else:
                response = Response()
                response.data={
                    'message':'No user in this phone number'
                }
                return response 
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class VerifyLoginUserOtp(APIView):
    def post(self,request):

        """ required field : code - string"""


        try:
            data=request.data
            print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
            phone_number=request.COOKIES.get('phone_number')
            print(phone_number)
            code=data['code']
            print(code)
            if check(phone_number,code):
                user = User.objects.filter(phone_number=phone_number).first()
                print('&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
                print(user)
                print(user)
                if user:
                    print('-------------------------------')
                    # response.delete_cookie(key='phone_number')
                    print('-------------------------------')
                    access_token = create_access_token(user.id)
                    print('-------------------------------')
                    refresh_token = create_refresh_token(user.id)
                    print('-------------------------------')
                    UserToken.objects.create(
                        user_id=user.id,
                        token=refresh_token,
                        expired_at=datetime.datetime.utcnow() + datetime.timedelta(days=7)
                    )

                    response = Response()
                    
                    response.set_cookie(key='refresh_token',value=refresh_token,httponly=True)
                    response.data = {
                        'token': access_token,
                        'admin': user.is_admin,
                        
                    }
                    return response
                else:
                    response = Response()
                    response.data={
                        'message':'Not verifiede'
                    }
                    return response 
            else:
                message = {'detail':'otp is not valid'}
                
                return Response(message, status=status.HTTP_400_BAD_REQUEST)
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetDistrictsView(APIView):
    authentication_classes = [JWTUserAuthentication]
    def get(self, request):
        try:
            districts = District.objects.all()
            serializer = DistrictSerializer(districts,many=True)   
            return Response(serializer.data)
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetCityByDistrictView(APIView):
    authentication_classes = [JWTUserAuthentication]
    def get(self, request,id):

        """ required field : district id"""
        try:
            city = City.objects.filter(district=id)
            serializer = CitySerializer(city,many=True)   
            return Response(serializer.data)
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class SelectlocationView(APIView):
    authentication_classes = [JWTUserAuthentication]
    def patch(self, request):

        """ required field : district-district id, city - city id"""
        try:

            user=request.user
            data=request.data
            print(user)
            print(data)
            userr=User.objects.get(username=user)
            print(userr)
            serializer = UpdateUserSerializer(userr,data,partial = True)   
            if serializer.is_valid():
                serializer.save()
                print("location update Successfully")
                response={
                    'message':'location update Successfully',
                    "data" : serializer.data
                }
                return Response(response)
            else:
                print("location update failed")
                print(serializer.errors)
                return Response(serializer.errors)
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class AllMovieDetails(APIView):
    authentication_classes = [JWTUserAuthentication]
    def get(self, request):
        try:
            userr=request.user
            print(userr)
            print(userr.city)



            movie = Movie.objects.filter(is_active=True)
            serializer =MovieSerializer(movie,many=True)   
            return Response(serializer.data) 
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)  


class AllMovieCategory(APIView):
    authentication_classes = [JWTUserAuthentication]
    def get(self, request):
        try:
            userr=request.user
            print(userr)
            print(userr.city)



            category = Category.objects.all()
            serializer =CategorySerializer(category,many=True)   
            return Response(serializer.data) 
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class AllMovieDetailsByLanguage(APIView):
    authentication_classes = [JWTUserAuthentication]
    def get(self, request,id):

        """ required field : language category id """

        try:
            userr=request.user
            print(userr)
            print(userr.city)



            movie = Movie.objects.filter(is_active=True,category_name=id)
            if movie:
                serializer =MovieSerializer(movie,many=True)   
                return Response(serializer.data)  
            else:
                return Response('No Theaters are showing this movie in your location')
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class TMDBMovieDetails(APIView):
    authentication_classes = [JWTUserAuthentication]

    def get(self,request,id):

        """ required field : movie id """
        try:
            print('************************************')
            movie=Movie.objects.get(id=id)
            print(movie)
            movie_id=movie.tmdb_id
            print('+++++++++++++++++++++++++')

            url='https://api.themoviedb.org/3/movie/'+str(movie_id)+'?api_key='+settings.API_KEY
            response=requests.get(url)
            print(response)
            data=response.json()
            return Response(data)
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class Theaterofthatmovie(APIView):
    authentication_classes = [JWTUserAuthentication]
    def get(self, request,id):

        """ required field : movie id """
        try:
            userr=request.user
            print(userr)
            print(userr.city)
            usercity=userr.city

            moviess=Movie.objects.get(id=id)
            print('****************')
            print(moviess)


            show = Show.objects.filter(is_active=True,vendor__city=usercity,movie=moviess)
            if show :
                serializer =ShowSerializer(show,many=True)   
                print('__________________')
                print(serializer.data)
                print('***********')
                print(len(serializer.data))

                ans=[]
                for i in serializer.data:
                    print(i['vendor']) 
                    ans.append(i['vendor'])

                response = {
                    'vendor':ans,
                    'showdetails': serializer.data
                }
                
                return Response(response)
            else:
                return Response('No Theaters are showing this movie in your location')
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetTheaterbyCity(APIView):
    authentication_classes = [JWTUserAuthentication]
    serializer_classes = UserSerializer
    def get(self, request):
        try:
            user=request.user
            userr=User.objects.get(username=user)
            print(userr)
            print(userr.city)
            
            theater = Vendor.objects.filter(city=userr.city)
            if theater:
                serializer = VendorSerializer(theater,many=True)   
                return Response(serializer.data)
            else:
                return Response('No Theaters are in your location')
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetAllShowsDate(APIView):
    authentication_classes = [JWTUserAuthentication]
    def get(self, request):

        try:
            date = ShowDate.objects.all()
            serializer =ShowDateSerializer(date,many=True)   
            return Response(serializer.data)
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class GetAllTimeDate(APIView):
    authentication_classes = [JWTUserAuthentication]
    def get(self, request):
        try:
        
            time = ShowTime.objects.all()
            serializer =ShowTimeSerializer(time,many=True)   
            return Response(serializer.data)
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetAllShowsbyYourChoice(APIView):
    authentication_classes = [JWTUserAuthentication]
    def get(self, request,date,time,vendor,movie):

        """ required field : date id,time id,vendor id, movie id """

        try:
            print('******000000')
            userr=request.user
            show = Show.objects.filter(date=date,time=time,vendor=vendor,movie=movie,is_active=True)
            print('******000000')
            if show:
                serializer =ShowSerializer(show,many=True)   
                print('****************************************************')
                print(serializer.data)
                ans=[]
                shw=[]
                for i in serializer.data:
                    print(i['screen']) 
                    ans.append(i['screen'])
                for i in serializer.data:
                    print(i['id']) 
                    shw.append(i['id'])
                response = {
                    'screen':ans,
                    'show':shw,
                    'showdetails': serializer.data
                }
                return Response(response)  
            else:
                return Response('No Shows are available on your location')
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetSeatofshow(APIView):
    authentication_classes = [JWTUserAuthentication]
    def get(self, request,id):

        """ required field : show id """
        try:
            seat = Seat.objects.filter(show=id)
            if seat:
                serializer =SeatSerializer(seat,many=True)
                return Response(serializer.data)  
            else:
                return Response('No Shows are available on your location')
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class BookedSeatofshow(APIView):
    authentication_classes = [JWTUserAuthentication]
    def get(self, request,id):

        """ required field : show id """
        try:
            seat = Seat.objects.filter(show=id,booked_status=True)
            if seat:
                serializer =SeatSerializer(seat,many=True)
                shw=[]
                
                for i in serializer.data:
                    print(i['seet_no']) 
                    shw.append(i['seet_no'])
                response = {
                    'seat':shw,
                    'seatdetails': serializer.data
                }
                return Response(response)  
            else:
                return Response('no seats are booked')
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class AvailableSeatofshow(APIView):
    authentication_classes = [JWTUserAuthentication]
    def get(self, request,id):

        """ required field : show id """
        try:
            seat = Seat.objects.filter(show=id,booked_status=False)
            if seat:
                serializer =SeatSerializer(seat,many=True)
                shw=[]
                
                for i in serializer.data:
                    print(i['seet_no']) 
                    shw.append(i['seet_no'])
                response = {
                    'seat':shw,
                    'seatdetails': serializer.data
                }
                return Response(response)  
            else:
                return Response('no seats are available')
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


# class BookTicket(APIView):
#     authentication_classes = [JWTUserAuthentication]
#     serializer_classes = BookingTicketSerializer
#     def post(self,request):
#         data = request.data
#         # request.data._mutable=True
#         userr=request.user
#         print(userr)
#         id=User.objects.get(username=userr).id
#         data['user']=id
#         data.update(request.data)
#         print(data)
#         print('-----------------------------------------------------------------')

        
#         print(data['seat_no'])
#         print(type(data['seat_no']))
#         for i in data['seat_no']:
#             id=i
#             print('========')
#             print(id)
#             seat=Seat.objects.get(id=id)
#             print(seat.booked_status)
#             if seat.booked_status==True:
#                 responce={
#                     'message': 'The seat is booked by another user',
#                     'seat_no': i
#                 }
#                 return Response(responce,status=status.HTTP_404_NOT_FOUND)
#         print('^^^^^^^^^^^^^^^^^^^')

#         # request.data._mutable=True
#         # userr=request.user
#         # print(userr)
#         # id=User.objects.get(username=userr).id
#         # data['user']=id
#         # data.update(request.data)

#         screeeee=data['screen']
#         print(screeeee)
#         screen=Screen.objects.get(id=screeeee)
#         print(screen.price)
#         priceperticket=screen.price
#         print(len(data['seat_no']))
#         ticketprice=priceperticket*len(data['seat_no'])
#         data['price']=ticketprice
#         data.update(request.data)
#         print(data)

#         print('----------0000000000000000----------------')
#         print(data)
#         print(type(data))
#         print('----------0000000000000000----------------')
#         serializer = self.serializer_classes(data=data)
#         if serializer.is_valid():
#             serializer.save()
            
#             print(serializer.data)
#             print('********************')
#             for i in serializer.data['seat_no']:
#                 seat=Seat.objects.get(id=i)
#                 seat.booked_status=True
#                 print(seat.booked_status)
#                 print('-------------')
#                 seat.save()
            
#             return Response(serializer.data)
#         else:
#         #     print(serializer.errors)
#             return Response(serializer.errors)


class BookTicket(APIView):
    authentication_classes = [JWTUserAuthentication]
    serializer_classes = BookingTicketSerializer
    def post(self,request):

        """ required field : show - show id, screen - screen id, seat_no - list of seat id """

        try:
            data = request.data
            # request.data._mutable=True
            userr=request.user
            print(userr)
            id=User.objects.get(username=userr).id
            data['user']=id
            data.update(request.data)
            print(data)
            print('-----------------------------------------------------------------')

            
            print(data['seat_no'])
            print(type(data['seat_no']))
            for i in data['seat_no']:
                id=i
                print('========')
                print(id)
                seat=Seat.objects.get(id=id)
                print(seat.booked_status)
                if seat.booked_status==True:
                    responce={
                        'message': 'The seat is booked by another user',
                        'seat_no': i
                    }
                    return Response(responce,status=status.HTTP_404_NOT_FOUND)
            print('^^^^^^^^^^^^^^^^^^^')

            # request.data._mutable=True
            # userr=request.user
            # print(userr)
            # id=User.objects.get(username=userr).id
            # data['user']=id
            # data.update(request.data)

            screeeee=data['screen']
            print(screeeee)
            screen=Screen.objects.get(id=screeeee)
            print(screen.price)
            priceperticket=screen.price
            print(len(data['seat_no']))
            ticketprice=priceperticket*len(data['seat_no'])

            brokercharger=ticketprice*5/100
            grandtotal=ticketprice+brokercharger
            print('-----------------')

            print(brokercharger)
            print(grandtotal)


            data['price']=grandtotal
            data['brokerfee']=brokercharger
            data.update(request.data)
            print(data)

            print('----------0000000000000000----------------')
            print(data)
            print(type(data))
            print('----------0000000000000000----------------')
            
            serializer = self.serializer_classes(data=data)
            if serializer.is_valid():
                serializer.save()
                
                print(serializer.data)
                print('********************')
                # for i in serializer.data['seat_no']:
                #     seat=Seat.objects.get(id=i)
                #     seat.booked_status=True
                #     print(seat.booked_status)
                #     print('-------------')
                #     seat.save()
                response={
                    'data':serializer.data,
                    "brokercharge":brokercharger,
                    'ticketpriceperseat':priceperticket,
                    'totalticketprice':ticketprice,
                    'grandtotal':grandtotal,
                    'brokercharger':brokercharger

                }
                return Response(response)
            else:
            #     print(serializer.errors)
                return Response(serializer.errors)
        except:
            message = {'detail':'Something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class Payment(APIView):
    authentication_classes = [JWTUserAuthentication]
    def patch(self, request,id):

        """ required field : ticket id """

        try:
            user=request.user
            data=request.data
            print(user)
            print(data)
            tticket=BokkingTicket.objects.get(id=id)
            print('8888888888888888888888')
            print(tticket)
            print(tticket.id)
            print(tticket.brokerfee)
            print('9999999999999999999999')
            broker = BrokerCharge.objects.create(
                ticket=tticket.id,
                user=tticket.user,
                show=tticket.show,
                screen=tticket.screen,
                brokerfee=tticket.brokerfee
                )
            print(broker)
            data['is_paid']=True
            serializer = BookingTicketSerializer(tticket,data,partial = True)   
            if serializer.is_valid():
                serializer.save()
                for i in serializer.data['seat_no']:
                    seat=Seat.objects.get(id=i)
                    seat.booked_status=True
                    print(seat.booked_status)
                    print('-------------')
                    seat.save()
                response={
                    'message':'payment Successfull',
                    "data" : serializer.data
                }
                return Response(response)
            else:
                print(serializer.errors)
                return Response(serializer.errors)
        except:
            return Response('amount already paid')


def temp_payment(request):
    print('***********111***********')
    payment =0
    ticket=0
    if request.method == 'POST':
        print('**********222************')
        amount = request.POST.get('amount')
        print('***********333***********',amount)
        id = request.POST['ticketid']
        print('***********444***********',id)
        request.session['key'] = id
        print(id)

        client =razorpay.Client(auth=(settings.RAZORPAY_PUBLIC_KEY,settings.RAZORPAY__SECRET_KEY))
        print('***********555***********',client)
        payment = client.order.create({"amount": int(amount) * 100, 
                                   "currency": "INR", 
                                   "payment_capture": "1"})
        print('*********666*************',payment)
      
        
        # payment['id']=id  
        print('{{{{{{{{{{{')
        print(payment['id'])
        # request.session['key'] =payment['id']
        print('????????????????????')
        ticket=BokkingTicket.objects.get(id=id)
        print(ticket)                                          

    return render(request,'payments.html',{'payment':payment,'ticket':ticket})

def paymentstatus(request):
    status =None
    response = request.POST
    # id = request.data['id']
    # print(id)

    print("ddd",response)

    params_dict = {
        'razorpay_order_id':response['razorpay_order_id'],
        'razorpay_payment_id':response['razorpay_payment_id'],
        'razorpay_signature':response['razorpay_signature']
    }
    print('-------111-------',params_dict)
    client =razorpay.Client(auth=(settings.RAZORPAY_PUBLIC_KEY,settings.RAZORPAY__SECRET_KEY))
    print('------2222--------',client)
   
    status = client.utility.verify_payment_signature(params_dict)
    print(status,'ghg')
    try:
        print('\\\\\\\\\\\\\\\\\\\\\\\\\\')
        id=request.session['key']
        ticket=BokkingTicket.objects.get(id=id)
        print(ticket) 
        ticket.payment_id  = response['razorpay_payment_id']
        ticket.save()
            
        print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        print(ticket)
        print(ticket.id,'------------')
        print(ticket.seat_no)
        print('------')
        serializer = BookingTicketSerializer(ticket,partial = True)   
        print('------')
        print(serializer.data)
        print('---------')
        
        for i in serializer.data['seat_no']:
            seat=Seat.objects.get(id=i)
            seat.booked_status=True
            print(seat.booked_status)
            print('-------------')
            seat.save()
        # for i in ticket.seat_no:
        #     seat=Seat.objects.get(id=i)
        #     seat.booked_status=True
        #     print(seat.booked_status)
        #     print('-------------')
        #     seat.save()
        
        ticket.is_paid=True
        ticket.save()

        id = request.session['key']
        ticket=BokkingTicket.objects.get(id=id)

        print(ticket)
        
        return render(request,'success.html',{'status':True})
    except:
        return render(request,'success.html',{'status':False})