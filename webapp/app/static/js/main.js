var studentDetailsComp=Vue.component('student-details',{
  data:function(){
    return{
      studentDetails:{
        usn:null,
      },
    }
  },
  methods:{
    setShowValue:function(){
      this.$parent.showQuiz=true;
    }
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
    }
  },
  methods:{
    getElectiveNames:function(elecNumber){
      this.$http.get('/elective/getElectiveNames',{elecNumber})
          .then((response) => {
            if(elecNumber==1){
              for(var i=0;i<response.data['elecName'][0].length;i++)
                this.Elective1[i].cname = response.data['elecName'][0][i];

	      for(var i=0;i<response.data['elecName'][1].length;i++)
                this.Elective2[i].cname = response.data['elecName'][1][i];
              
            }
            else if(elecNumber==3){
              for(var i=0;i<response.data['elecName'][2].length;i++)
                this.Elective3[i].cname = response.data['elecName'][2][i];

	      for(var i=0;i<response.data['elecName'][3].length;i++)
                this.Elective4[i].cname = response.data['elecName'][3][i];
           
            }
            else if(elecNumber==5){
              for(var i=0;i<response.data['elecName'][4].length;i++)
                this.Elective5[i].cname = response.data['elecName'][4][i];

	      for(var i=0;i<response.data['elecName'][5].length;i++)
                this.Elective6[i].cname = response.data['elecName'][5][i];
              
            }
          })
          .catch((err) => {
            console.log("error",err);
          })
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
      this.electiveName.firstPool1="Multimedia  Computing";
      this.electiveName.firstPool2="XML Technologies";
      this.electiveName.secondPool1="Design Patterns";
      this.electiveName.secondPool2="Autonomous Mobile Robotics";
      console.log("reco");
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
          })
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
  },
  methods: {
  },
  mounted(){
    console.log("here");
  }
});
