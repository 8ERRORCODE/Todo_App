from django.urls import path

from .views import TaskList,TaskDetail,health_check
urlpatterns = [
    path('tasks/',TaskList.as_view(),name='task_list'),
    path('tasks/<int:pk>/',TaskDetail.as_view(),name='task-detail'),
    path('health/', health_check, name='health_check'),
]
