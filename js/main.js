var game = {
	power: true,
	opacityHigh: '1',
	opacityLow: '0.6',
	playerTurn: false,
	handler: false,
	inGame: false,
	sequence: [],
	currIdx: 0,
	mapping: {
		1: "green",
		2: "red",
		3: "blue",
		4: "yellow"
	},
	
	
	
	
	strict: false,
	count: 0,
	rounds: 0,
	turn: 0,
	level: 0,
	
	shape: "#shape",
  hexDigits: ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],
	
	
	
	
	flash: function(el, times, speed, pad) {
		var that = this;
		
		if (times > 0) {
			that.playSound(pad);
			el.stop().animate({opacity: this.opacityHigh}, {
				duration: 50,
				complete: function () {
					el.stop().animate({opacity: that.opacityLow}, 200);
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
	addToSequence: function () {
		var options = this.nums(),
		    nextNum = options[Math.floor(Math.random()*options.length)];
				
		this.sequence.push(nextNum);
	},
	playSequence: function () {
		var that=this;
		
		$.each(this.sequence, function(idx, val) {
			setTimeout(function() {
				that.flash($(that.shape+val),1,300,val);
			}, 500 * idx)
		});
	},
	init: function () {
		if (!this.handler) {
			this.initPadHandler();
		}
		
		this.newGame();
	},
	newGame: function () {
		this.inGame = true;
	  this.computerTurn();
	},
	computerTurn: function () {
		this.currIdx = 0;
		this.addToSequence();
		this.playSequence();
		this.playerTurn = true;
	},
	initPadHandler: function () {
		var that = this;
		
		$(".pad").click(function () {
			if (that.playerTurn) {
				var val = this.id.charAt(5);
				that.flash($(that.shape+val),1,300,val);
				if (Number(val) === that.sequence[that.currIdx]) {
					console.log('correct');
					that.currIdx++;
				} else {
					console.log('wrong');
					that.gameOver();
				}
				
				if (that.currIdx >= that.sequence.length) {
					that.roundOver();
				}
				console.log(val);
				console.log(that.sequence[that.currIdx]);
			}
		})
		
		this.handler = true;
	},
	nums: function () {
		var keys = [];
		for (var k in this.mapping) {
			keys.push(Number(k));
		}
		return keys;
	},
	roundOver: function() {
		
	},
	
	
	
	
	playSound: function(clip) {
		var sound = $(".sound"+clip)[0];
		sound.currentTime = 0;
		sound.play();
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
		// var correctPad = this.sequence[this.turn],
// 				that = this;
//
// 		this.active = false;
// 		this.updateScore();
//
// 		setTimeout(function(){
// 			that.flash($(that.shape+correctPad), 4, 300, correctPad);
// 		}, 500);
	},
	updateScore: function() {
		
	}
}

$(document).ready(function() {
	$(".power").click(function() {
		game.power = !game.power;
		if (game.power === true) {
			$(".power").css("opacity", game.opacityHigh);
		} else {
			$(".power").css("opacity", game.opacityLow);
		}
	})
	
	$(".start").click(function() {
		if (game.power && !game.inGame) {
			$(this).css("opacity", game.opacityHigh);
			game.init();
		}
	})
})