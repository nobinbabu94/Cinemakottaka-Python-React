from urllib import response
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from user_api.models import User
from user_api.authentication import JWTUserAuthentication
from vendor_api.models import Vendor
from user_api.serializers import UserSerializer
from vendor_api.serializers import VendorSerializer
from . serializers import UpdateVendorSerializer,UpdateUserSerializer,DistrictSerializer,CitySerializer,CityenquerySerializer,CategorySerializer,MovieSerializer
from . models import District,City,Cityenquery,Movie,Category
from rest_framework.response import Response
from django.http import JsonResponse
from django.core.mail import send_mail
from django.template.defaultfilters import slugify

import requests
from django.conf import settings

from rest_framework import status


from user_api . models import BokkingTicket,BrokerCharge
from user_api . serializers import BookingTicketSerializer,BrokerChargeSerializer

from admin_api.task import send_moviemail_func
# Create your views here.



class VerifyVendor(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    def patch(self, request,id):

        """required field : vendor id"""
        try:
        
            details = Vendor.objects.get(id=id)
            details.is_active=True
            print(details.is_active)
            serializer = UpdateVendorSerializer(details,data=request.data,partial = True)
            if serializer.is_valid():
                serializer.save()

                print('-------------------')
                print(details.email)
                print('---------------')

                mailingemail= details.email
                print(mailingemail)
                
                send_mail('Hello  ',
                'Congratulations, your Vender application is approved.',
                'ashrafchekintakath@gmail.com'
                ,[mailingemail]   
                ,fail_silently=False)


                print("Vendor verified Successfully")
                return Response(serializer.data)
            else:
                print("Vendor verification failed")
                print(serializer.errors)
                return Response(serializer.errors)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class BlockVendor(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    def patch(self, request,id):

        """required field : vendor id"""
        try:

            details = Vendor.objects.get(id=id)
            print('-------111111111-------------')
            if details.is_Vendor==True:
                print('-------222222-------------')
                details.is_active=False
                details.is_Vendor=False
            else:
                print('-------333333-------------')
                details.is_Vendor=True
            print(details.is_active)
            print('-------4444444444-------------')
            serializer = UpdateVendorSerializer(details,data=request.data,partial = True)
            if serializer.is_valid():
                print('-------5555555-------------')
                serializer.save()
                print("Vendor action Successfully")
                return Response(serializer.data)
            else:
                print("Vendor action failed")
                print(serializer.errors)
                return Response(serializer.errors)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class BlockUser(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    def patch(self, request,id):

        """required field : user id""" 

        try:
            details = User.objects.get(id=id)
            if details.is_active==True:
                details.is_active=False
            else:
                details.is_active=True
            print(details.is_active)
            serializer = UpdateUserSerializer(details,data=request.data,partial = True)
            if serializer.is_valid():
                serializer.save()
                print("vender action Successfully")
                return Response(serializer.data)
            else:
                print("Vendor action failed")
                print(serializer.errors)
                return Response(serializer.errors)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetUserDetailsView(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    serializer_classes = UserSerializer
    def get(self, request,id):

        """required field : user id"""


        try:
            user = User.objects.get(id=id)
            serializer = UserSerializer(user,many=False)   
            return Response(serializer.data)
        except:
            message = {'message':'No User with this id already exist'}
            return Response(message)

class GetUsersView(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    serializer_classes = UserSerializer
    def get(self, request):
        try:
            users = User.objects.all()
            serializer = UserSerializer(users,many=True)   
            return Response(serializer.data)
        except:
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetVendorDetailsView(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    serializer_classes = UserSerializer
    def get(self, request,id):

        """required field : vendor id"""

        try:
            vendor = Vendor.objects.get(id=id)
            serializer = VendorSerializer(vendor,many=False)   
            return Response(serializer.data)
        except:
            message = {'message':'No Vendor with this id exist'}
            return Response(message)

    

class GetVendorsView(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    serializer_classes = VendorSerializer
    def get(self, request):
        try:
            vendors = Vendor.objects.all()
            district = District.objects.all()
            # for i in vendors:
            #      print(i.district.district,",<<<<<<<<<<<<<<<<<<<<<<<<<<<") 
            #      items = {str(i.id):i.district.district}
            #      district.update(items)
            # for i in district:
            #     print(district[i])
            
            # c=response()
            
            serializer = VendorSerializer(vendors,many=True)

            name = DistrictSerializer(district,many=True)
            
            # print(serializer,name,"<<<<<<<<<<<<<<<<<<<<<<<<")
            # return Response(serializer.data)
            return JsonResponse({"vendor":serializer.data,"district":name.data})
             
        except:     
            message = {'detail':'somthing whent worng'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class GetVendorsByDistrictView(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    serializer_classes = VendorSerializer
    def get(self, request,id):

        """required field : district id"""
        try:
            vendors = Vendor.objects.filter(district=id)
            serializer = VendorSerializer(vendors,many=True)   
            return Response(serializer.data)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetVendorsByCityView(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    serializer_classes = VendorSerializer
    def get(self, request,id):
    
        """required field : city id"""

        try:
            vendors = Vendor.objects.filter(city=id)
            serializer = VendorSerializer(vendors,many=True)   
            return Response(serializer.data)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class AddDistrictView(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    serializer_classes = DistrictSerializer
    def post(self,request):

        """required field : district-string """
        try:
            data = request.data
            serializer = self.serializer_classes(data=data)
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
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class AddCityView(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    serializer_classes = CitySerializer
    def post(self,request):

        """required field : district-id, city-string"""

        try:
            data = request.data
            serializer = self.serializer_classes(data=data)
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
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class UpdateDistrictView(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    def get(self, request,id):

        """required field : district id"""

        try:
            details = District.objects.get(id=id)
            serializer = DistrictSerializer(details,context={'request': request})
            return Response(serializer.data)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request,id):

        """required field : district id"""
        try:
            print(request.body)
            details = District.objects.get(id=id)
            serializer = DistrictSerializer(details,data=request.data,)
            if serializer.is_valid():
                print(serializer.validated_data)
                serializer.save()
                print("Update district successfully updated")
                return Response(serializer.data)
            else:
                print("Update district failed")
                return Response(serializer.errors)    
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request,id):

        """required field : district id"""
        try:
            details = District.objects.get(id=id)
            details.delete()
            return Response({'message':'District deleted'})
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    def patch(self, request,id):

        """required field : district id"""
        try:
            details = District.objects.get(id=id)
            serializer = DistrictSerializer(details,data=request.data,partial = True)
            if serializer.is_valid():
                print(serializer.validated_data)
                serializer.save()
                print("Update district successfully updated")
                return Response(serializer.data)
            else:
                print("Update district failed")
                print(serializer.errors)
                return Response(serializer.errors)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class UpdateCityView(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    def get(self, request,id):

        """required field : city id"""
        try:
            details = City.objects.get(id=id)
            serializer = CitySerializer(details,context={'request': request})
            return Response(serializer.data)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request,id):

        """required field : city id"""

        try:
            print(request.body)
            details = City.objects.get(id=id)
            serializer = CitySerializer(details,data=request.data,)
            if serializer.is_valid():
                print(serializer.validated_data)
                serializer.save()
                print("Update city successfully updated")
                return Response(serializer.data)
            else:
                print("Update city failed")
                return Response(serializer.errors)   
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request,id):

        """required field : city id"""
        try:
            details = City.objects.get(id=id)
            details.delete()
            return Response({'message':'City deleted'})
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request,id):

        """required field : city id"""

        try:

            details = City.objects.get(id=id)
            serializer = CitySerializer(details,data=request.data,partial = True)
            if serializer.is_valid():
                print(serializer.validated_data)
                serializer.save()
                print("Update city successfully updated")
                return Response(serializer.data)
            else:
                print("Update city failed")
                print(serializer.errors)
                return Response(serializer.errors)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetDistrictsView(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    def get(self, request):
        try:
            districts = District.objects.all()
            serializer = DistrictSerializer(districts,many=True)   
            return Response(serializer.data)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetCitiesView(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    def get(self, request):
        try:
            cities = City.objects.all()
            serializer = CitySerializer(cities,many=True)   
            return Response(serializer.data)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetCityenqueryView(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    def get(self, request):
        try:
            cities = Cityenquery.objects.all()
            serializer = CityenquerySerializer(cities,many=True)   
            return Response(serializer.data)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetUnapprovedCityenqueryView(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    def get(self, request):
        try:
            cities = Cityenquery.objects.all().exclude(is_approved=True) 
            serializer = CityenquerySerializer(cities,many=True)  
            return Response(serializer.data)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class ApproveCityenqueryView(APIView):
   
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    def patch(self, request,id):
       
        """required field : cityenquery id"""
        try:
            cities = Cityenquery.objects.get(id=id)
            cities.is_approved=True
            create_city = City.objects.create(district=cities.district,city=cities.cityenqueryname)
            create_city.save()
            print(cities.is_approved)
            serializer = CityenquerySerializer(cities,data=request.data,partial = True)
            if serializer.is_valid():
                serializer.save()

                print('-------------------')
                print(cities.email)
                print('---------------')

                mailingemail= cities.email
                print(mailingemail)
                
                send_mail('Hello  ',
                'You have requested for The city on your registration.We are sorry for not verified that City.Now can register . Please register again.',
                'nobins73@gmail.com'
                ,[mailingemail]   
                ,fail_silently=False)


                print("Vendor verified Successfully")
                return Response(serializer.data)
            else:
                print("Vendor verification failed")
                print(serializer.errors)
                return Response(serializer.errors)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    

class AddCategoryView(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]

    def post(self, request):
        """ required field : category_name - string"""
        try:
            data = request.data
            request.data._mutable=True
            data['slug']=slugify(data['category_name'])
            data.update(request.data)
            serializer = CategorySerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                print(serializer.errors)
                return Response(serializer.errors)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class AddMoviesView(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]

    def post(self, request):

        """ required field : movie_name - string, category_name - id, tmdb_id - string"""
        try:
            serializer = MovieSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                print(serializer.data['movie_name'])
                moviename=serializer.data['movie_name']
                
                # send_moviemail_func.delay()
                send_moviemail_func()

                return Response(serializer.data)
            else:
                print(serializer.errors)
                return Response(serializer.errors)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class BlockMovie(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    def patch(self, request,id):

        """ required field : movie id"""
        try:
            movie = Movie.objects.get(id=id)
            if movie.is_active==True:
                movie.is_active=False
            else:
                movie.is_active=True
            print(movie.is_active)
            serializer = MovieSerializer(movie,data=request.data,partial = True)
            if serializer.is_valid():
                serializer.save()
                print("Movie action Successfully")
                return Response(serializer.data)
            else:
                print("Movie action failed")
                print(serializer.errors)
                return Response(serializer.errors)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class UpdateMovie(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    def patch(self, request,id):

        """ required field : movie id"""
        try:
            movie = Movie.objects.get(id=id)
            serializer = MovieSerializer(movie,data=request.data,partial = True)
            if serializer.is_valid():
                serializer.save()
                print("Movie update Successfully")
                return Response(serializer.data)
            else:
                print("Movie update failed")
                print(serializer.errors)
                return Response(serializer.errors)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request,id):

        """ required field : movie id"""
        try:
            details = Movie.objects.get(id=id)
            details.delete()
            return Response({'message':'Movie deleted'})
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request,id):

        """ required field : movie id"""

        try:
            movie = Movie.objects.get(id=id)
            serializer = MovieSerializer(movie,data=request.data)
            if serializer.is_valid():
                serializer.save()
                print("Movie update Successfully")
                return Response(serializer.data)
            else:
                print("Movie update failed")
                print(serializer.errors)
                return Response(serializer.errors)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class TMDBNowplayingMovies(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]

    def get(self,request):
        try:
            url='https://api.themoviedb.org/3/movie/now_playing?api_key='+settings.API_KEY
            response=requests.get(url)
            print(response)
            data=response.json()
            results=data['results']
            # final=results[0]
            # print(final['id'])
            # print(final['original_title'])
            
            answer={}

            for a in range(20):
                final=results[a]
                print(type(final))
                print(final['id'])
                print(final['original_title'])
                
                # answer[a]=final['id'],final['original_title']
                answer[final['id']]=final['original_title']
                
            print('********************')
            print(answer)
            # return Response(results)
            # return Response(data)
            return Response(answer)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

# class TMDBMovieDetails(APIView):
#         permission_classes=[IsAdminUser]
#         authentication_classes = [JWTUserAuthentication]

#         def get(self,request,movie_id):
#             url='https://api.themoviedb.org/3/movie/'+str(movie_id)+'?api_key='+settings.API_KEY
#             response=requests.get(url)
#             print(response)
#             data=response.json()
#             return Response(data)

class TMDBMovieDetails(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]

    def get(self,request,id):
        """ required field : movie id"""
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
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class MovieDetails(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    def get(self, request):
        try:
            movie = Movie.objects.all()
            serializer =MovieSerializer(movie,many=True)   
            return Response(serializer.data)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetAllMovieByLanguage(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    def get(self, request,id):

        """ required field : category id"""

        try:
            movie = Movie.objects.filter(category_name=id)
            serializer =MovieSerializer(movie,many=True)
            
            return Response(serializer.data)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetAllBookedDetails(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    def get(self, request):

        try:
            ticket = BokkingTicket.objects.all()
            serializer =BookingTicketSerializer(ticket,many=True)
            
            return Response(serializer.data)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class GetAllBrokerCharge(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    def get(self, request):

        try:
            ticket = BrokerCharge.objects.all()
            serializer =BrokerChargeSerializer(ticket,many=True)
            
            return Response(serializer.data)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class AllPaidTicket(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    serializer_classes = VendorSerializer
    def get(self, request):
        try:
            ticket = BokkingTicket.objects.filter(is_paid=True)
            serializer = BookingTicketSerializer(ticket,many=True)   
            return Response(serializer.data)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

class AllPendingTicket(APIView):
    permission_classes=[IsAdminUser]
    authentication_classes = [JWTUserAuthentication]
    serializer_classes = VendorSerializer
    def get(self, request):
        try:
            ticket = BokkingTicket.objects.filter(is_paid=False)
            serializer = BookingTicketSerializer(ticket,many=True)   
            return Response(serializer.data)
        except:
            message = {'detail':'something went wrong'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)