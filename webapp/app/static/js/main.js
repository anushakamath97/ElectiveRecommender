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
     //      Elective1: [{id:1, cname:"Advanced Algorithms",}, 
     //  {id:2, cname:"Advanced Database Management Systems",}, 
     //  {id:3, cname:"Big Data",},
     //  {id:4, cname:"Multimedia  Computing",},
     //  {id:5, cname:"XML Technologies"},],
    	// Elective2: [{id:1, cname:"Advanced Algorithms",}, 
     //  {id:2, cname:"Advanced Database Management Systems",}, 
     //  {id:3, cname:"Big Data",},
     //  {id:4, cname:"Multimedia  Computing",},
     //  {id:5, cname:"XML Technologies"},],
      Elective1:[{cname:null},{cname:null},{cname:null},{cname:null},{cname:null}],
      Elective2:[{cname:null},{cname:null},{cname:null},{cname:null},{cname:null}],
      Elective3:[{cname:null},{cname:null},{cname:null},{cname:null},{cname:null}],
      Elective4:[{cname:null},{cname:null},{cname:null},{cname:null},{cname:null}],
      Elective5:[{cname:null},{cname:null},{cname:null},{cname:null},{cname:null}],
      Elective6:[{cname:null},{cname:null},{cname:null},{cname:null},{cname:null}],
    }
  },
  methods:{
    getElectiveNames:function(elecNumber){
      this.$http.get('/elective/getElectiveNames',{elecNumber})
          .then((response) => {
            if(elecNumber==1){
              for(var i=0;i<response.data['elecName'][0].length;i++){
                this.Elective1[i].cname=response.data['elecName'][0][i];
                this.Elective2[i].cname=response.data['elecName'][1][i];
              }
            }
            else if(elecNumber==3){
              for(var i=0;i<response.data['elecName'][0].length;i++){
                this.Elective3[i].cname=response.data['elecName'][2][i];
                this.Elective4[i].cname=response.data['elecName'][3][i];
              }
            }
            else if(elecNumber==5){
              for(var i=0;i<response.data['elecName'][0].length;i++){
                this.Elective5[i].cname=response.data['elecName'][0][i];
                this.Elective6[i].cname=response.data['elecName'][1][i];
              }
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
      this.electiveName.firstPool1="Advanced Database Management Systems";
      this.electiveName.firstPool2="Computer Graphics and Visualization";
      this.electiveName.secondPool1="Multimedia  Computing";
      this.electiveName.secondPool2="XML Technologies";
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
