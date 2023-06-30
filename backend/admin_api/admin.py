from django.contrib import admin
from . models import District,City,Cityenquery,Category,Movie
# Register your models here.

class DistrictAdmin(admin.ModelAdmin):
    list_display = ('id','district')

class CityAdmin(admin.ModelAdmin):
    list_display = ('id','city','district')

class CityenqueryAdmin(admin.ModelAdmin):
    list_display = ('id','cityenqueryname','district','email','is_approved')

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id','category_name','slug')

class MovieAdmin(admin.ModelAdmin):
    list_display = ('id','tmdb_id','movie_name','category_name','is_active')

admin.site.register(District,DistrictAdmin)
admin.site.register(City,CityAdmin)

admin.site.register(Cityenquery,CityenqueryAdmin)

admin.site.register(Category,CategoryAdmin)
admin.site.register(Movie,MovieAdmin)