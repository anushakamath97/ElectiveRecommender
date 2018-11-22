var studentDetailsComp=Vue.component('student-details',{
  data:function(){
    return{
      studentDetails:{
        usn:null,
        term:"even",
        sem:5,
        specialisation:"none",
      },
    }
  },
  methods:{
    setShowValue:function(){
      this.$parent.showQuiz=true;
    },
    updateSem:function(){
      if(this.studentDetails.usn!=null && this.studentDetails.usn.length>4){
        if(this.studentDetails.usn.substring(4,6)=="15"){
          if(this.studentDetails.term=="even")
            this.studentDetails.sem=8;
          else if(this.studentDetails.term=="odd")
            this.studentDetails.sem=7;
        }
        else if(this.studentDetails.usn.substring(4,6)=="16"){
          if(this.studentDetails.term=="even")
            this.studentDetails.sem=6;
          else if(this.studentDetails.term=="odd")
            this.studentDetails.sem=5;
        }
      }
    }
  }
});

var weightageMeterComp=Vue.component('weightage-meter',{
  data:function(){
    return{
      weightage:{
        performance:0,
        intersts:0,
        specialisation:0,
      },
    }
  },
  methods:{
  }
});

var electiveList = Vue.component('elective-list',{
  data:function(){
    return{
      Elective1:[{cname:null},{cname:null},{cname:null},{cname:null},{cname:null}],
      Elective2:[{cname:null},{cname:null},{cname:null},{cname:null},{cname:null}],
      Elective3:[{cname:null},{cname:null},{cname:null},{cname:null},{cname:null},{cname:null}],
      Elective4:[{cname:null},{cname:null},{cname:null},{cname:null},{cname:null},{cname:null}],
      Elective5:[{cname:null},{cname:null},{cname:null},{cname:null},{cname:null},{cname:null}],
      Elective6:[{cname:null},{cname:null},{cname:null},{cname:null},{cname:null},{cname:null},{cname:null}],
      prevElectives:[],
    }
  },
  methods:{
    getElectiveNames:function(elecNumber){
      this.$http.get('/elective/getElectiveNames',{elecNumber})
          .then((response) => {
            if(elecNumber==1){
              for(var i=0;i<response.data['elecName'][0].length;i++){
                this.Elective1[i].cname = response.data['elecName'][0][i];
              }

	      for(var i=0;i<response.data['elecName'][1].length;i++){
                this.Elective2[i].cname = response.data['elecName'][1][i];
              }
            }
            else if(elecNumber==3){
              for(var i=0;i<response.data['elecName'][2].length;i++){
                this.Elective3[i].cname = response.data['elecName'][2][i];
              }

	      for(var i=0;i<response.data['elecName'][3].length;i++){
                this.Elective4[i].cname = response.data['elecName'][3][i];
              }
            }
            else if(elecNumber==5){
              for(var i=0;i<response.data['elecName'][4].length;i++){
                this.Elective5[i].cname = response.data['elecName'][4][i];
              }

	      for(var i=0;i<response.data['elecName'][5].length;i++){
                this.Elective6[i].cname = response.data['elecName'][5][i];
              }
            }
          })
          .catch((err) => {
            console.log("error",err);
          })
    }
  }
});


var interestsList = Vue.component('interests-list',{
	data : function(){
		return {
			list_interests : [],
			interests_show : ['Deep Learning','Dynamic Programming','Big Data','Data Analytics','Storage Management','Networking'],
			noOfSelected : {count:10},
			containerdiv : null,
			timer: null,
			search_: null,
		}
	},
	methods : {
		addInterest: function(event){
			if(this.noOfSelected.count == 0)
				return;
			if(this.list_interests.indexOf(event.target.value) == -1)
			{	this.list_interests.push(event.target.value);
				this.noOfSelected.count -= 1;
			}
			//this.interests_show.splice(this.interests_show.indexOf(event.target.value),1);
			
		},
		removeInterest: function(event){
			//this.interests_show.push(event.target.value);
			this.list_interests.splice(this.list_interests.indexOf(event.target.value),1);
			//this.interests_show = this.interests_show.slice(0,4);
			this.noOfSelected.count += 1;
		},
		getInterests: function(event)
		{
			//If a function is already registered, cancel it and setTimeout
		      if(this.timer)
		      {
			clearTimeout(this.timer);
		      }

		      //Go to the server in 1 sec
		       this.timer = setTimeout(this.fetchInterests,1000);
		},
		fetchInterests: function(){
			
    			this.search_ = document.getElementById("search");
			this.containerdiv = document.getElementById("container");
			if(this.search_.value=='')
			{
				this.containerdiv.innerHTML = "";
				this.containerdiv.style.display = "none";
				return;
			}
			else {

      				mykey = "/elective/getInterests"+this.search_.value;
				if(localStorage[mykey])
				{
					//show from cache
					cachedInterests = JSON.parse(localStorage[mykey])['interestNames'];
					console.log("from cache");
					//Show from the cached
					this.populateInterests(cachedInterests);
				}
				else {
					var prefix = this.search_.value;
					//No option but to visit server for the movies list
					this.$http.get('/elective/getInterests',{prefix})
						.then((response) => {
						if(response.readyState == 4 && response.status == 200)
						{
							//We expect a JSON as return value
							options = response.data['interestNames'];
							if(options.length == 0)
							{
								//Clean up the containerdiv. It should be empty
								this.containerdiv.innerHTML = "OOPS!! no such option :(";
								//this.containerdiv.style.display = "none";


							}
							else { //we got some intersts

								this.populateInterests(options);
								//Now cache the movies in localStorage
								localStorage[mykey] = response.responseText;
							}
    						}
					}).catch((err) => {
						console.log("error",err);
					});
      				}
    			}
 		 },
		populateInterests : function(options)
		{
			//First empty the list and populate it afresh
			this.containerdiv.innerHTML = "";

			for (var i = 0; i < options.length; i++) {
				newdiv  = document.createElement('input');
				newdiv.type = "button";
				newdiv.value = options[i];
				newdiv.className = "intrOption";

          			//Add it to the conttainer
          			this.containerdiv.appendChild(newdiv);

          			//something more
          			newdiv.onclick = this.addInterest;
        		}
			this.containerdiv.style.display = "block";
      		}
	}
});

var recoResultComp=Vue.component('reco-result',{
  data:function(){
    return{
    electiveName:{
      firstPool1:null,
      firstPool2:null,
      secondPool1:null,
      secondPool2:null,
    },
    electiveData:{
      desc:null,
      teacher:null,
      special:null,
      prereq:null,
    }
    }
  },
  methods:{
    getRecommendation:function(){
      // this.electiveName.firstPool1="Multimedia  Computing";
      // this.electiveName.firstPool2="XML Technologies";
      // this.electiveName.secondPool1="Design Patterns";
      // this.electiveName.secondPool2="Autonomous Mobile Robotics";
      var intersts=vue.$refs.student_details.$refs.interests_list.list_interests;
      var performanceWeight=parseInt(vue.$refs.weightage_meter.weightage.performance);
      var interestWeight=parseInt(vue.$refs.weightage_meter.weightage.interests);
      var specialWeight=parseInt(vue.$refs.weightage_meter.weightage.specialisation);
      var weights=[performanceWeight,interestWeight,specialWeight];
      var oldElectives=vue.$refs.student_details.$refs.elective_list.prevElectives;
      var specialisation=vue.$refs.student_details.studentDetails.specialisation;
      console.log(intersts,weights,oldElectives,specialisation)
      var recoRequest={"interests":intersts,"weights":weights,"oldElectives":oldElectives,"specialisation":specialisation}
      this.$http.put('/elective/getRecommendations',recoRequest)
          .then((response) => {
            console.log(response.data);
            this.electiveName.firstPool1=response.data['pool1'][0];
            this.electiveName.firstPool2=response.data['pool1'][1];
            this.electiveName.secondPool1=response.data['pool2'][0];
            this.electiveName.secondPool2=response.data['pool2'][1];
          })
          .catch((err) => {
            console.log("error",err);
          });
    },
    getElectiveData:function(reqElective){
      this.$http.get('/elective/getElectiveData',{reqElective})
          .then((response) => {
            console.log(response.data);
            this.electiveData.desc=response.data['desc'];
            this.electiveData.teacher=response.data['teacher'];
            this.electiveData.special=response.data['special'];
            this.electiveData.prereq=response.data['prereq'];
          })
          .catch((err) => {
            console.log("error",err);
          });
    }
  }
});

var vue = new Vue({
  el: '#app',
  delimiters:["[[","]]"],
  data: function(){
	return{
      showQuiz:false,
    }
  },
  components:{
    'student-details':studentDetailsComp,
    'reco-result':recoResultComp,
    'elective-list':electiveList,
    'interests-list':interestsList,
    'weightage-meter':weightageMeterComp,
  },
  methods: {
  }
});
