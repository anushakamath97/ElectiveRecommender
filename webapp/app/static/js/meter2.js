/* set radius for all circles */
		var r2 = 100;
		var circles2 = document.querySelectorAll('.circular2');
		var total_circles2 = circles2.length;
		for (var i = 0; i < total_circles2; i++) {
		    circles2[i].setAttribute('r', r2);
		}
		/* set meter's wrapper dimension */
		var meter_dimension2 = (r2 * 2) + 100;
		var wrapper2 = document.querySelector('#meterwrapper2');
		wrapper2.style.width = meter_dimension2 + 'px';
		wrapper2.style.height = meter_dimension2 + 'px';
		/* add strokes to circles  */
		var cf2 = 2 * Math.PI * r2;
		var semi_cf2 = cf2 / 2;
		var semi2_cf_1by3 = semi_cf2 / 3;
		var semi2_cf_2by3 = semi2_cf_1by3 * 2;
		document.querySelector('#outline_curves2')
		    .setAttribute('stroke-dasharray', semi_cf2 + ',' + cf2);
		document.querySelector('#low2')
		    .setAttribute('stroke-dasharray', semi_cf2 + ',' + cf2);
		document.querySelector('#avg2')
		    .setAttribute('stroke-dasharray', semi2_cf_2by3 + ',' + cf2);
		document.querySelector('#high2')
		    .setAttribute('stroke-dasharray', semi2_cf_1by3 + ',' + cf2);
		document.querySelector('#outline_ends2')
		    .setAttribute('stroke-dasharray', 2 + ',' + (semi_cf - 2));
		document.querySelector('#mask2')
		    .setAttribute('stroke-dasharray', semi_cf2 + ',' + cf2);
		/*bind range slider event*/
		var slider2 = document.querySelector('#slider2');
		var lbl2 = document.querySelector("#lbl2");
		var mask2 = document.querySelector('#mask2');
		var meter_needle2 =  document.querySelector('#meter_needle2');
		function range_change_event2() {
		    var percent2 = slider2.value;
		    var meter_value2 = semi_cf2 - ((percent2 * semi_cf2) / 100);
		    mask2.setAttribute('stroke-dasharray', meter_value2 + ',' + cf2);
		    meter_needle2.style.transform = 'rotate(' + (270 + ((percent2 * 180) / 100)) + 'deg)';
		    lbl2.textContent = percent2 + '%';
		}
slider2.addEventListener('input', range_change_event2);