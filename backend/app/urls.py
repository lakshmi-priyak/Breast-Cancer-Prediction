from django.urls import path
from django.views.generic import RedirectView
from .views import PredictView

urlpatterns = [
    path('', RedirectView.as_view(url='api/predict/'), name='home'),  # Redirect root URL to /api/predict/
    path('api/predict/', PredictView.as_view(), name='predict'),  
]
