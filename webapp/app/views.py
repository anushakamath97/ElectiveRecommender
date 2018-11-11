from django.shortcuts import render

context={}
def elective(request):
	return render(request, "index.html",context)
