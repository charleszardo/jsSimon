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
	
	$(".power").click(function() {
		power = !power;
	})
	
	$(".start").click(function() {
		console.log(power);
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
	
	$(".pad").click(function() {
		console.log(this.id);
	})
	
	function game () {
		var play = true,
		    options = nums(),
			  sequence = [],
			  curr_num;
				
		while (rounds < 5) {
			// gen new num
			curr_num = options[Math.floor(Math.random()*options.length)];
			// add to seq
			sequence.push(curr_num);
			// play seq
			// user input
			rounds++;
		}
	}
})