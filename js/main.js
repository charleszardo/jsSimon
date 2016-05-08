var game = {
	power: false,
	strict: false,
	count: 0,
	rounds: 0,
	inPlay: false,
	handler: false,
	sequence: [],
	playSequence: [],
  hexDigits: ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],
	mapping: {
		1: "green",
		2: "red",
		3: "blue",
		4: "yellow"
	},
	flash: function(el, times, speed, pad) {
		var that = this;
		
		if (times > 0) {
			that.playSound(pad);
			element.stop().animate({opacity: '1'}, {
				duration: 50,
				complete: function () {
					element.stop().animate({opacity: '0.6'}, 200);
				}
			});
		}
		
		if (times > 0) {
			setTimeout(function () {
				that.flash(element, times, speed, pad);
			}, speed);
			times -= 1;
		}
	},
	nums: function () {
		var keys = [];
		for (var k in this.mapping) {
			keys.push(Number(k));
		}
		return keys;
	},
	playSound: function(clip) {
		var sound = $(".sound"+clip)[0];
		sound.currentTime = 0;
		sound.play();
	},
	addToSequence: function () {
		var options = this.nums(),
		    nextNum = options[Math.floor(Math.random()*options.length)];
				
				this.sequence.push(nextNum);
	},
	init: function () {
		console.log(this.sequence);
	  this.addToSequence();
		console.log(this.sequence);
		// while (rounds < 5) {
		// 	// play seq
		// 	console.log(sequence);
		// 	// user input
		// 	inPlay = true;
		// 	playRound(sequence);
		// 	inPlay = false;
		// 	rounds++;
		// }
	}
}

$(".power").click(function() {
	game.power = !game.power;
	if (game.power === true) {
		$(".power").css("opacity", "1");
	} else {
		$(".power").css("opacity", "0.6");
	}
})

$(".start").click(function() {
	if (power) {
		game();
	}
})

function playRound(sequence) {
	var idx = 0,
			currPad;
	while (idx < sequence.length) {
		currPad = sequence[idx];
		$(".pad").click(function() {
			console.log(this.id);
			idx++
		})
	}
}

$(".pad").click(function() {
	if (inPlay) {
		
	}
})

$(document).ready(function() {
	game.init();
})