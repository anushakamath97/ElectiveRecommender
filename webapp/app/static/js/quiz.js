$('.usnNext').click(function(){
	$('.usnDiv').fadeOut(1000);
	$('.specialisation').delay(2000).fadeIn(1000);
});

showResults=function(){
	vue.$refs.reco_result.getRecommendation();
	$('.resultSection').delay(1000).fadeIn(1500);
}

$('.specNext').click(function(){
	$('.specialisation').fadeOut();
	if($('#semester').val() > 5 && $('#semester').val() < 9)
		$('.prevElectives').fadeIn(1500);
	else if($('#semester').val() == 5)
		$('.interests').fadeIn(1500);
});

$('.elecNext').click(function(){
	$('.prevElectives').fadeOut();
	$('.interests').fadeIn(1500);
});

$('.interestNext').click(function(){
	$('.interests').fadeOut();
	$('.weightage').fadeIn(1500);
});

$('.meterNext').click(function(){
	$('.weightage').fadeOut();
	$('.recoLoad').fadeIn(1500);
	$('.recoLoad').delay(8000).fadeOut(500);
	// $('.recoResult').delay(8500).fadeIn(500).done(showResults());
	$.when($('.recoResult').delay(8500).fadeIn(500))
                               .done(function() {
   			 showResults();
			});$('.recoLoad').fadeIn(1500);
	$('.recoLoad').delay(8000).fadeOut(500);
	// $('.recoResult').delay(8500).fadeIn(500).done(showResults());
	$.when($('.recoResult').delay(8500).fadeIn(500))
                               .done(function() {
   			 showResults();
			});
})
