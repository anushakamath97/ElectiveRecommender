$('.usnNext').click(function(){
	$('.usnDiv').fadeOut(1000);
	$('.specialisation').delay(2000).fadeIn(1000);
});

showResults=function(){
	vue.$refs.reco_result.getRecommendation();
	$('.resultSection').delay(1000).fadeIn(1500);
}


$('.specNext').click(function(){
	if($('#semester').val() > 5 && $('#semester').val() < 9)
	{	
		$('.specialisation').fadeOut(1000);
		$('.prevElectives').delay(2000).fadeIn(1000);
		$('.sem5').delay(2000).fadeIn(1000);
		$curr_page = 5;
		prevElectiveList = [];
		elective_no = 1;
		vue.$refs.student_details.$refs.elective_list.getElectiveNames(elective_no);
	}
	else if($('#semester').val() == 5){
		$('.specialisation').fadeOut(1000,function(){
			$('.home').css('background-image', 'url(../static/images/back.jpg)');	
		});
		vue.$refs.student_details.$refs.elective_list.prevElectives=prevElectiveList;	
		$('.interests').delay(2000).fadeIn(1000);
	}
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
	var pool1Checked = $("input:checkbox[name=elec"+elective_no+"]").is(":checked");
	var pool2Checked = $("input:checkbox[name=elec"+(elective_no+1)+"]").is(":checked");
	if (pool1Checked && pool2Checked){
		var $sem = $('#semester').val();
		prevElectiveList.push(document.querySelector('.elec'+elective_no+':checked').value);
		prevElectiveList.push(document.querySelector('.elec'+(elective_no+1)+':checked').value);
		elective_no += 2;
		vue.$refs.student_details.$refs.elective_list.getElectiveNames(elective_no);
		if($curr_page != ($sem-1))
		{	
			$('.sem'+$curr_page).fadeOut();
			$('.sem'+($curr_page +1)).delay(1000).fadeIn(1500);
			$curr_page = $curr_page + 1;
		}
		else 
		{
			$('.sem'+$curr_page).fadeOut();
			$('.prevElectives').fadeOut(500,function(){
				$('.home').css('background-image', 'url(../static/images/back.jpg)');	
			});
			vue.$refs.student_details.$refs.elective_list.prevElectives=prevElectiveList;
			$('.interests').delay(1000).fadeIn(1500);
		}
	}
});

$('.interestNext').click(function(){
	$('.interests').fadeOut();
	$('.weightage').fadeIn(1500);
});

$('.meterNext').click(function(){
	$('.weightage').fadeOut();
	$('.recoLoad').fadeIn(1500);
	$('.recoLoad').delay(4000).fadeOut(500);
	// $('.recoResult').delay(8500).fadeIn(500).done(showResults());
	$.when($('.recoResult').delay(4500).fadeIn(500))
                               .done(function() {
   			 showResults();
			});
})
