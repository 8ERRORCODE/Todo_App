from django.shortcuts import render
from django.http import Http404,JsonResponse

from rest_framework.views import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Task

from .serializers import TaskSerializer



class TaskList(APIView):
  def get(self,request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks,many=True)
    return Response(serializer.data)
  
  def post(self,request):
    serializer = TaskSerializer(data=request.data)
    if(serializer.is_valid()):
      serializer.save()
      return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class TaskDetail(APIView):
  def get_object(self,pk):
      try:
        return Task.objects.get(pk=pk)
      except Task.DoesNotExist:
        raise Http404
      
  def get(self,request,pk):
    task = self.get_object(pk)
    serializer = TaskSerializer(task)
    return Response(serializer.data,status=status.HTTP_201_CREATED)
  
  def delete(self,request,pk):
    task = self.get_object(pk)
    task.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
      


def health_check(request):
    return JsonResponse({"status": "ok"})