
from django.urls import path
from . import views
urlpatterns = [
    path('register/',views.UserRegister.as_view(),name='register'),
    path('verifyuser/',views.VerifyUserOtp.as_view(),name='verifyuser'),
    path('loginuser/',views.LoginUserAPIView.as_view(),name='loginuser'),
    path('refreshuser/',views.RefreshUserAPIView.as_view(), name="refresh"),
    path('user/',views.UserAPIView.as_view(),name='user'),
    path('logoutuser/',views.LogoutUserAPIView.as_view(),name='logoutuser'),


    path('loginuserwithotp/',views.LoginUserWithOtpAPIView.as_view(),name='loginuserwithotp'),
    path('verifyloginuserotp/',views.VerifyLoginUserOtp.as_view(),name='verifyloginuserotp'),

    path('alldistrict/',views.GetDistrictsView.as_view(),name='alldistrict'),
    path('allcitybydistrict/<int:id>/',views.GetCityByDistrictView.as_view(),name='allcitybydistrict'),
    path('selectlocation/',views.SelectlocationView.as_view(),name='selectlocation'),
    path('getallmovie/',views.AllMovieDetails.as_view(),name='getallmovie'),
    path('getallmoviecategory/',views.AllMovieCategory.as_view(),name='getallmoviecategory'),
    path('getallmoviebylanguage/<int:id>/',views.AllMovieDetailsByLanguage.as_view(),name='getallmoviebylanguage'),
    path('tmdbmoviedetails/<int:id>/',views.TMDBMovieDetails.as_view(),name='tmdbmoviedetailsbymovieid'),
    path('theater/<int:id>/',views.Theaterofthatmovie.as_view(),name='theater'),
    path('theaterbycity/',views.GetTheaterbyCity.as_view(),name='theaterbycity'),
    path('showdate/',views.GetAllShowsDate.as_view(),name='showdate'),
    path('showtime/',views.GetAllTimeDate.as_view(),name='showtime'),
    path('showbychoice/<int:date>/<int:time>/<int:vendor>/<int:movie>/',views.GetAllShowsbyYourChoice.as_view(),name='showbychoice'),
    path('seatofshow/<int:id>/',views.GetSeatofshow.as_view(),name='seatofshow'),
    path('bookedseatofshow/<int:id>/',views.BookedSeatofshow.as_view(),name='bookedseatofshow'),
    path('availableseatofshow/<int:id>/',views.AvailableSeatofshow.as_view(),name='availableseatofshow'),

    path('bookticket/',views.BookTicket.as_view(),name='bookticket'),
    path('payment/<int:id>/',views.Payment.as_view(),name='payment'),

    path('payz/', views.temp_payment, name="payy"),
    path('statusz/', views.paymentstatus, name="status"),

]