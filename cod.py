celery -A cinemakottaka.celery worker --pool=solo -l info

ghh

try:
    
except:
        message = {'detail':'somthing whent worng'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)