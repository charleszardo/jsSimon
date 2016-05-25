var game = {
	power: true,
	strict: false,
	count: 0,
	rounds: 0,
	turn: 0,
	level: 0,
	inPlay: false,
	handler: false,
	inGame: false,
	sequence: [],
	currSequence: [],
	shape: "#shape",
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
			el.stop().animate({opacity: '1'}, {
				duration: 50,
				complete: function () {
					el.stop().animate({opacity: '0.6'}, 200);
				}
			});
		}
		
		if (times > 0) {
			setTimeout(function () {
				that.flash(el, times, speed, pad);
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
		
		this.playRound();
	},
	playSequence: function () {
		var that=this;
		
		$.each(this.sequence, function(idx, val) {
			setTimeout(function() {
				that.flash($(that.shape+val),1,300,val)
			}, 500 * idx)
		});
	},
	playerMove: function(pad) {
		this.currSequence.push(pad);
		this.checkSequence(pad);
	},
	checkSequence: function(pad) {
		var that = this;
		
		if (pad !== this.sequence[this.turn]) {
			this.gameOver();
		} else {
			this.updateScore();
			this.turn++;
		}
		
		if (this.turn === this.sequence.length) {
			this.level++;
			//update level
			this.active = false;
			setTimeout(function(){
				that.newLevel();
			}, 1000);
		}
	},
	gameOver: function() {
		var correctPad = this.sequence[this.turn],
				that = this;

		this.active = false;
		this.updateScore();
		
		setTimeout(function(){
			that.flash($(that.shape+correctPad), 4, 300, correctPad);
		}, 500);
	},
	updateScore: function() {
		
	},
	init: function () {
		this.newGame();
	},
	newGame: function () {
		console.log('h');
	}
}

$(".pad").click(function() {
	if (inPlay) {
		
	}
})

$(document).ready(function() {
	$(".power").click(function() {
		game.power = !game.power;
		if (game.power === true) {
			$(".power").css("opacity", "1");
		} else {
			$(".power").css("opacity", "0.6");
		}
	})
	
	$(".start").click(function() {
		if (game.power && !game.inGame) {
			$(this).css("opacity", "1");
			game.init();
		}
	})
})