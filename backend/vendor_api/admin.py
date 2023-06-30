from django.contrib import admin
from .  models import Vendor,ShowTime,Screen,ShowDate,Show,Seat
# Register your models here.

class VendorAdmin(admin.ModelAdmin):
    list_display = ('id','first_name','email','district','city','is_active')

class ShowAdmin(admin.ModelAdmin):
    list_display = ('id','movie','category_name','vendor','screen','date','time','is_active')

class ScreenAdmin(admin.ModelAdmin):
    list_display = ('id','screen_name','vendor','total_seet','price')


class SeatAdmin(admin.ModelAdmin):
    list_display = ('id','seet_no','show','screen','vendor','booked_status')

# class ShowTimeAdmin(admin.ModelAdmin):
#     list_display = ('id','date')


admin.site.register(Vendor,VendorAdmin)
admin.site.register(Screen,ScreenAdmin)
admin.site.register(ShowDate)
admin.site.register(ShowTime)
admin.site.register(Show,ShowAdmin)
admin.site.register(Seat,SeatAdmin)