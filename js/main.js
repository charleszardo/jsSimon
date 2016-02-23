$(document).ready(function() {
	var power = false,
		  strict = false,
			count = 0,
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
	
	function game () {
		var play = true,
		    options = nums(),
			  sequence = [],
			  curr_num;
				
		while (play) {
			curr_num = options[Math.floor(Math.random()*options.length)];
			play = false;
		}
	}
})