$("#postIt1").click(function(){
	// console.log("test");
	$('#postIt1Open').fadeIn(1500);
	vue.$refs.reco_result.getElectiveData($("#postIt1").text());
});

$("#postIt2").click(function(){
	// console.log("test");
	$('#postIt2Open').fadeIn(1500);
	vue.$refs.reco_result.getElectiveData($("#postIt2").text());
});
$("#postIt3").click(function(){
	// console.log("test");
	$('#postIt3Open').fadeIn(1500);
	vue.$refs.reco_result.getElectiveData($("#postIt3").text());
});
$("#postIt4").click(function(){
	// console.log("test");
	$('#postIt4Open').fadeIn(1500);
	vue.$refs.reco_result.getElectiveData($("#postIt4").text());
});
$('.back').click(function(){
	$('#postIt1Open').fadeOut(1500);	
	$('#postIt2Open').fadeOut(1500);	
	$('#postIt3Open').fadeOut(1500);	
	$('#postIt4Open').fadeOut(1500);	
	// $('#postIt1Open').fadeIn(1500);
});

// window.onload = function() {
//     var reloading = sessionStorage.getItem("reloading");
//     if (reloading) {
//         sessionStorage.removeItem("reloading");
//         restartFunction();
//     }
// }

$('.restart').click(function(){
    // sessionStorage.setItem("reloading", "true");
    document.location.reload();
});


// function restartFunction() {
// 	$('.hexa1').delay(1000).hide();
//   	$('.hexa2').delay(2000).hide();	
//     $('.home').delay(5000).css('background-image', 'url(../static/images/stopMotionHome1.gif)');
//   	$('#studentDetailsDiv').delay(4000).fadeIn();
// }
