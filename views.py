from django.shortcuts import render,HttpResponseRedirect
from django.http import HttpResponse
import os
from django.conf import settings

def dash3(request,*args,**kwargs):
    # directory = os.getcwd()
    # print(directory)
    # return HttpResponse(directory)
    # react_build_dir = os.path.join(settings.REACT_BUILD_DIR, 'index.html')
    # with open(react_build_dir, 'r') as file:
    #     return HttpResponse(file.read())

    return render(request,'index.html')

    # return render(request,"{% static 'templates/dashboard3/index.html' %}")
    # return HttpResponseRedirect('http://localhost:5174/')