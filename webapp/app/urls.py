from django.urls import path
from . import views

urlpatterns = [
    path('', views.elective, name='elective'),
    path('getElectiveData',views.electiveDataView.as_view()),
    path('getElectiveNames',views.electiveNameView.as_view()),
]
