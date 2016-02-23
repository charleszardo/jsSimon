$(document).ready(function() {
	var power = false,
		  strict = false,
			count = 0,
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
	
	function LightenDarkenColor(col, amt) {
	    var usePound = false;
  
	    if (col[0] == "#") {
	        col = col.slice(1);
	        usePound = true;
	    }
 
	    var num = parseInt(col,16);
 
	    var r = (num >> 16) + amt;
 
	    if (r > 255) r = 255;
	    else if  (r < 0) r = 0;
 
	    var b = ((num >> 8) & 0x00FF) + amt;
 
	    if (b > 255) b = 255;
	    else if  (b < 0) b = 0;
 
	    var g = (num & 0x0000FF) + amt;
 
	    if (g > 255) g = 255;
	    else if (g < 0) g = 0;
 
	    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
	}

	function hex(x) {
	  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
	 }
	 
	//Function to convert rgb color to hex format
	function rgb2hex(rgb) {
	 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}
	
	function nums () {
		var keys = [];
		for (var k in mapping) {
			keys.push(Number(k));
		}
		return keys;
	}
	
	function playSequence(sequence) {
		var color;
		sequence.forEach(function(el) {
			color = mapping[el];
			var $currEl = $("#" + color);
			console.log($currEl);
		})
	}
	
	function game () {
		var play = true,
		    options = nums(),
			  sequence = [],
			  curr_num;
				
		while (play) {
			curr_num = options[Math.floor(Math.random()*options.length)];
			sequence.push(curr_num)
			playSequence(sequence);
			play = false;
		}
	}
})