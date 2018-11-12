/* set radius for all circles */
		var r1 = 100;
		var circles1 = document.querySelectorAll('.circular1');
		var total_circles1= circles1.length;
		for (var i = 0; i < total_circles1; i++) {
		    circles1[i].setAttribute('r', r1);
		}
		/* set meter's wrapper dimension */
		var meter_dimension1 = (r1 * 2) + 100;
		var wrapper1 = document.querySelector('#meterwrapper1');
		wrapper1.style.width = meter_dimension1 + 'px';
		wrapper1.style.height = meter_dimension1 + 'px';
		/* add strokes to circles  */
		var cf1 = 2 * Math.PI * r1;
		var semi_cf1 = cf1 / 2;
		var semi1_cf_1by3 = semi_cf1 / 3;
		var semi1_cf_2by3 = semi1_cf_1by3 * 2;
		document.querySelector('#outline_curves1')
		    .setAttribute('stroke-dasharray', semi_cf1 + ',' + cf1);
		document.querySelector('#low1')
		    .setAttribute('stroke-dasharray', semi_cf1 + ',' + cf1);
		document.querySelector('#avg1')
		    .setAttribute('stroke-dasharray', semi1_cf_2by3 + ',' + cf1);
		document.querySelector('#high1')
		    .setAttribute('stroke-dasharray', semi1_cf_1by3 + ',' + cf1);
		document.querySelector('#outline_ends1')
		    .setAttribute('stroke-dasharray', 2 + ',' + (semi_cf1 - 2));
		document.querySelector('#mask1')
		    .setAttribute('stroke-dasharray', semi_cf1 + ',' + cf1);
		/*bind range slider event*/
		var slider1 = document.querySelector('#slider1');
		var lbl1 = document.querySelector("#lbl1");
		var mask1 = document.querySelector('#mask1');
		var meter_needle1 =  document.querySelector('#meter_needle1');
		function range_change_event1() {
		    var percent1 = slider1.value;
		    var meter_value1 = semi_cf1 - ((percent1 * semi_cf1) / 100);
		    mask1.setAttribute('stroke-dasharray', meter_value1 + ',' + cf1);
		    meter_needle1.style.transform = 'rotate(' + (270 + ((percent1 * 180) / 100)) + 'deg)';
		    lbl1.textContent = percent1 + '%';
		}
slider1.addEventListener('input', range_change_event1);