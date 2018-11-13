$('.usnNext').click(function(){
	$('.usnDiv').fadeOut(1000);
	$('.specialisation').delay(2000).fadeIn(1000);
});

showResults=function(){
	vue.$refs.reco_result.getRecommendation();
	$('.resultSection').delay(1000).fadeIn(1500);
}

$('.specNext').click(function(){
	$('.specialisation').fadeOut(1000);
	if($('#semester').val() > 5 && $('#semester').val() < 9)
	{	$('.prevElectives').delay(2000).fadeIn(1000);
		$('.sem5').delay(2000).fadeIn(1000);
		$curr_page = 5;
		prevElectiveList = [];
		elective_no = 1;

	}
	else if($('#semester').val() == 5)
		$('.interests').delay(2000).fadeIn(1000);
});

$("input:checkbox").on("click", function(){
	var $box = $(this);
	if($box.is(":checked")){
		var group = "input:checkbox[name="+$box.attr("name")+"]";
		$(group).prop("checked",false);
		$box.prop("checked",true);
	}
	else
		$box.prop("checked",false);
});



$('.elecNext').click(function(){
	var $sem = $('#semester').val();
	prevElectiveList.push(document.querySelector('.elec'+elective_no+':checked').value);
	prevElectiveList.push(document.querySelector('.elec'+(elective_no+1)+':checked').value);
	elective_no += 2;
	if($curr_page != ($sem-1))
	{	
		$('.sem'+$curr_page).fadeOut();
		$('.sem'+($curr_page +1)).fadeIn(1500);
		$curr_page = $curr_page + 1;
	}
	else 
	{
		$('.sem'+$curr_page).fadeOut();
		$('.prevElectives').fadeOut();
		$('.interests').delay(1000).fadeIn(1500);
	}
	console.log(prevElectiveList);
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
			});
})
