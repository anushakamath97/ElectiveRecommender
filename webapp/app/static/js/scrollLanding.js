$(document).ready(function(){
   // $('#studentDetailsDiv').fadeOut();
});

scrollUpLanding = function(){
	$('header').css({"animation":"scroll-up 2s .5s cubic-bezier(0, 0.5, 0, 1) forwards"});
	// $('header').slideUp(1500);
  	$('.startQuiz').fadeIn();
}
 
  changeBack=function() {
  	$('.startQuiz').hide();
  	$('.hexa1').delay(1000).hide();
  	$('.hexa2').delay(2000).hide();	
    $('.home').delay(5000).css('background-image', 'url(../static/images/stopMotionHome1.gif)');
 	// setTimeout(showQuiz(),5000);
  	$('#studentDetailsDiv').delay(4000).fadeIn();
 	// $('.home').css('animation','stopMotionHome 9.5s ease-in-out');
	// $('.home').delay(4000).css('background-image', 'url(../static/images/bookPen.jpg)');  		
	// setTimeout(function(){
 //    	$('.home').css('background-image', 'url(../static/images/pen.jpg)');  	
	// }, 1000);
	// setTimeout(function(){
 //    	$('.home').css('background-image', 'url(../static/images/eraser.jpg)');  	
	// }, 1500);
	// setTimeout(function(){
 //    	$('.home').css('background-image', 'url(../static/images/back.jpg)');  	
	// }, 2000);
	// setTimeout(function(){
 //    	$('.home').css('background-image', 'url(../static/images/book.jpg)');  	
	// }, 2500);
	// setTimeout(function(){
 //    	$('.home').css('background-image', 'url(../static/images/bookPen.jpg)');  	
	// }, 3000);
  	// $('.home').css('background-image', 'url(../static/images/bookPen.jpg)').fadeIn();
      	
  };

  showQuiz = function(){
  	// $('.home').css('background-image', 'url(../static/images/bookPen.jpg)');
  // vue.$refs.student_details.setShowValue();
  }