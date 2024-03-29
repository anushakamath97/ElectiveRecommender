from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

import pandas as pd

import os,sys,inspect
currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
# parentdir = os.path.dirname(currentdir)
# main_dir = os.path.dirname(parentdir)
sys.path.insert(0,currentdir)
print(sys.path)

from backend_code import elective_recommender as er
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

class interestsView(APIView):
	def get(self,request):
		elec_data=pd.read_csv('app/static/data/electives_data.csv')
		interests_list = list(map(lambda s: list(map(lambda key: key.strip().lower(), s.split(','))),elec_data['Keywords']))
		final_list = []
		
		prefix = request.GET['prefix'].lower()
		#print(prefix)
		for keywords in interests_list:
			for key in keywords:
				if key.startswith(prefix):
					final_list.append(key)
		data = {'interestNames' : set(final_list)}
		return Response(data)

class recoView(APIView):
	def put(self,request):
		print(request.data)
		recoResult=er.getSuggestions(request.data['usn'],request.data['interests'], request.data['weights'], old_electives=request.data['oldElectives'], specialization=request.data['specialisation'])
		print(recoResult)
		data=recoResult
		return Response(data)
