var game = {
	power: true,
	opacityHigh: '1',
	opacityLow: '0.6',
	playerTurn: false,
	handler: false,
	inGame: false,
	sequence: [],
	currIdx: 0,
	score: 0,
	highScore: 0,
	mapping: {
		1: "green",
		2: "red",
		3: "blue",
		4: "yellow"
	},
	shape: "#shape",
	// strict: false,
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
		this.playerTurn = false;
		this.sequence = [];
		this.currIdx = 0;
		this.score = 0;
		this.computerTurn();
	},
	computerTurn: function () {
		this.playerTurn = false;
		this.addToSequence();
		this.playSequence();
		this.playerTurn = true;
	},
	initPadHandler: function () {
		var that = this;
		
		this.handler = true;
		
		$(".pad").click(function () {
			if (that.playerTurn) {
				var val = this.id.charAt(5);
				that.flash($(that.shape+val),1,300,val);
				that.handlePlayerInput(val, that);
			}
		})
	},
	nums: function () {
		var keys = [];
		for (var k in this.mapping) {
			keys.push(Number(k));
		}
		return keys;
	},
	roundOver: function() {
		var that=this;
		this.playerTurn = false;
		this.currIdx = 0;
		this.score++;
		this.updateScore();
		
		setTimeout(function() {
			that.computerTurn();
		}, 1000)
	},
	handlePlayerInput: function(_val, scope) {
		var val = Number(_val),
		   that = scope;
		
		if (val === that.sequence[that.currIdx]) {
			console.log('correct');
			that.currIdx++;
		} else {
			console.log('wrong');
			that.gameOver();
		}
		
		if (that.currIdx >= that.sequence.length) {
			that.roundOver();
		}
	},
	gameOver: function() {
		var correctPad = this.sequence[this.currIdx],
				that = this;
		
		console.log("GAME OVER!!");
		this.inGame = false;
		this.playerTurn = false;
		this.score = 0;
		this.updateScore();
		$(".start").css("opacity", game.opacityLow);

		setTimeout(function(){
			that.flash($(that.shape+correctPad), 4, 300, correctPad);
		}, 500);
	},
	updateScore: function() {
		$(".score").html(this.score);
	},
	updateHighScore: function() {
		$(".high-score").html(this.highScore);
	},
	playSound: function(clip) {
		var sound = $(".sound"+clip)[0];
		sound.currentTime = 0;
		sound.play();
	}
}

$(document).ready(function() {
	database.ref('high-score').once('value').then(function(snapshot){
		game.highScore = snapshot.val().score;
		game.updateHighScore();
	})
	
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
			$(".score").html(game.score);
			game.init();
		}
	})
})