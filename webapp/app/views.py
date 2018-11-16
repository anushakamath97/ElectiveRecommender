from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

import pandas as pd

import os,sys,inspect
currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
main_dir = os.path.dirname(parentdir)
sys.path.insert(0,main_dir)
print(sys.path)

context={}
electiveNames=[]
def elective(request):
	return render(request, "index.html",context)

class electiveDataView(APIView):
	def get(self,request):
		print("request elective",request.GET['reqElective'])
		elec_data=pd.read_csv('app/static/data/electives_data.csv')
		elective_df=elec_data[elec_data['Course_name']==request.GET['reqElective']]
		data={"desc":elective_df['Description'].iloc[0],"teacher":elective_df['Teacher'].iloc[0],"special":elective_df['Specialization'].iloc[0],"prereq":elective_df['Prerequisites'].iloc[0]}
		print(data)	
		return Response(data)

class electiveNameView(APIView):
	def get(self,request):
		elec_data=pd.read_csv('app/static/data/electives_data.csv')
		elective_df=elec_data[elec_data['Elective_no']==int(request.GET['elecNumber'])]
		if(len(electiveNames)>=int(request.GET['elecNumber'])):
			electiveNames[int(request.GET['elecNumber'])-1]=elective_df['Course_name'].tolist()
		else:
			electiveNames.append(elective_df['Course_name'].tolist())
		elective_df1=elec_data[elec_data['Elective_no']==int(request.GET['elecNumber'])+1]
		if(len(electiveNames)>=int(request.GET['elecNumber'])+1):
			electiveNames[int(request.GET['elecNumber'])]=elective_df1['Course_name'].tolist()
		else:
			electiveNames.append(elective_df1['Course_name'].tolist())
		data={"elecName":electiveNames}
		print(data)	
		return Response(data)