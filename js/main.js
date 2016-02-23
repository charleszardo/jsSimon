$(document).ready(function() {
	var power = true,
		  strict = false,
			count = 0,
		  rounds = 0,
	    hexDigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],
			mapping = {
				1: "green",
				2: "red",
				3: "blue",
				4: "yellow"
			};
	
	$("#power").click(function() {
		power = !power;
	})
	
	$("#start").click(function() {
		if (power) {
			game();
		}
	})
	
	function nums () {
		var keys = [];
		for (var k in mapping) {
			keys.push(Number(k));
		}
		return keys;
	}
	
	function fade(el, val) {
		$(el).fadeTo( "slow", val );
	}
	
	function playSequence(sequence) {
		var color,
		    $currEl;
		sequence.forEach(function(el) {
			color = mapping[el];
			$currEl = $("#" + color);
			fade($currEl, 0.33);
			setTimeout(function(){}, 1500);
			fade($currEl, 1);
		})
	}
	
	function game () {
		var play = true,
		    options = nums(),
			  sequence = [],
			  curr_num;
				
		while (rounds < 5) {
			curr_num = options[Math.floor(Math.random()*options.length)];
			sequence.push(curr_num);
			console.log(sequence);
			playSequence(sequence);
			play = false;
			rounds++;
		}
	}
})