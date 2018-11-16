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