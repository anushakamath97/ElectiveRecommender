var studentDetailsComp=Vue.component('student-details',{
  data:function(){
    return{
      studentDetails:{
        usn:null,
      }
    }
  },
  methods:{
    setShowValue:function(){
      this.$parent.showQuiz=true;
    }
  }
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
    }
  },
  components:{
    'student-details':studentDetailsComp,
    'reco-result':recoResultComp,
  },
  methods: {
  },
  mounted(){
    console.log("here");
  }
});
