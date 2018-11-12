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
	template : "<li> {{elec}} </li>",
	props : ['title']
});

var recoResultComp=Vue.component('reco-result',{
  data:function(){
    return{
      firstPool1:null,
      firstPool2:null,
      secondPool1:null,
      secondPool2:null,
    }
  },
  methods:{
    getRecommendation:function(){
      this.firstPool1="Advanced Computer Networks";
      this.firstPool2="Human Computer Interaction";
      this.secondPool1="big data";
      this.secondPool2="da";
      console.log("reco");
    }
  }
});

var vue = new Vue({
  el: '#app',
  delimiters:["[[","]]"],
  data: function(){
	return{
      showQuiz:false,
      elective1: [{id:1, cname:"Advanced Algorithms",}, 
	{id:2, cname:"Advanced Database Management Systems",}, 
	{id:3, cname:"Big Data",},
	{id:4, cname:"Multimedia  Computing",},
	{id:5, cname:"XML Technologies"},],
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
