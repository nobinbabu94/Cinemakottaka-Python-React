
from django.urls import path
from . import views
urlpatterns = [
    path('register/',views.VendorRegister.as_view(),name='register'),
    path('loginvendor/',views.LoginVendorAPIView.as_view(),name='loginvendor'),
    path('refreshvendor/',views.RefreshVendorAPIView.as_view(), name="refreshvendor"),
    path('vendor/',views.VendorAPIView.as_view(),name='vendor'),
    path('logoutvendor/',views.LogoutVendorAPIView.as_view(),name='logoutvendor'),


    path('addshowtime/',views.AddShowTime.as_view(),name='addshowtime'),
    path('addshowdate/',views.AddShowDate.as_view(),name='addshowdate'),
    
    path('addscreen/',views.AddScreen.as_view(),name='addscreen'),
    path('updatescreen/<int:id>/',views.UpdateScreen.as_view(),name='updatescreen'),
    path('getallscreen/',views.GetAllScreen.as_view(),name='getallscreen'),
    path('getallscreenbymovieid/<int:id>/',views.GetAllScreenByMovie.as_view(),name='getallscreenbymovieid'),
    path('getallscreenbyshow/<int:id>/',views.GetAllScreenByShow.as_view(),name='getallscreenbyshow'),

    path('addshow/',views.AddShow.as_view(),name='addshow'),
    path('blockshow/<int:id>/',views.BlockShow.as_view(),name='blockshow'),
    path('getallshow/',views.GetAllShows.as_view(),name='getallshow'),
    path('getallupcomingshow/',views.GetAllUpcomingShows.as_view(),name='getallupcomingshow'),
    path('getallfinishedshow/',views.GetAllfinishedShows.as_view(),name='getallfinishedshow'),
    path('getallshowbymovie/<int:id>/',views.GetAllShowsByMovie.as_view(),name='getallshowbymovie'),
    path('getallshowbyscreen/<int:id>/',views.GetAllShowsByScreen.as_view(),name='getallshowbyscreen'),
    path('getallshowbylanguage/<int:id>/',views.GetAllShowsByLanguage.as_view(),name='getallshowbylanguage'),
    path('getallshowbytime/<int:id>/',views.GetAllShowsByTime.as_view(),name='getallshowbytime'),
    path('getallshowbydate/<int:id>/',views.GetAllShowsByDate.as_view(),name='getallshowbydate'),

    path('addseat/',views.AddSeat.as_view(),name='addseat'),
    path('bookedseatbyshow/<int:id>/',views.Bookedseatbyshow.as_view(),name='bookedseatbyshow'),
    path('unbookedseatbyshow/<int:id>/',views.UnBookedseatbyshow.as_view(),name='unbookedseatbyshow'),
    path('GetDistrictAll/',views.GetDistrictAll.as_view(),name='GetDistrictAll'),
]