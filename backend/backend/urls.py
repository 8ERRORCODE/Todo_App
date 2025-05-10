from django.contrib import admin
from django.urls import path,include
from django.views.generic import RedirectView
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({"status": "ok"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('List.urls')),
    path('', RedirectView.as_view(url='/tasks/', permanent=False)),
    path('health/', health_check),
    
]
