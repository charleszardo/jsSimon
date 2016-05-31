var game = {
	power: false,
	opacityHigh: '1',
	opacityLow: '0.6',
	playerTurn: false,
	handler: false,
	inGame: false,
	sequence: [],
	currIdx: 0,
	score: 0,
	playbackCount: 0,
	mapping: {
		1: "green",
		2: "red",
		3: "blue",
		4: "yellow"
	},
	shape: "#shape",
	flash: function(el, times, speed, pad) {
		var that = this;
		
		if (times > 0 && this.power) {
			that.playSound(pad);
			el.stop().animate({opacity: this.opacityHigh}, {
				duration: 50,
				complete: function () {
					that.playbackCount++;
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
		this.playbackCount = 0;
		this.playerTurn = false;
		$(this.sequence).each(function(idx, val) {
			setTimeout(function() {
				that.flash($(that.shape+val),1,300,val);
			}, 500 * idx)
		}).promise().done(this.togglePlayerTurn.call(that));
	},
	init: function () {
		if (!this.handler) {
			this.initPadHandler();
		}
		
		this.newGame();
	},
	newGame: function () {
		this.inGame = true;
		this.reset();
		this.updateScore();
		this.computerTurn();
	},
	computerTurn: function () {
		this.playerTurn = false;
		this.addToSequence();
		this.playSequence();
		// this.playerTurn = true;
	},
	togglePlayerTurn: function () {
		// console.log(this.playerTurn);
		// console.log('stop');
		// this.playerTurn = !this.playerTurn;
		// console.log(this.playerTurn);
	},
	initPadHandler: function () {
		var that = this;
		
		this.handler = true;
		
		$(".pad").click(function () {
			if (that.playbackCount === that.score + 1) {
				that.playerTurn = true;
			}
			
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
			that.currIdx++;
			if (that.currIdx >= that.sequence.length) {
				that.roundOver();
			}
		} else {
			that.gameOver();
		}
	},
	gameOver: function() {
		var correctPad = this.sequence[this.currIdx],
				that = this;
		
		this.updateHighScoreInDb(this.score);
		this.inGame = false;
		this.reset();
		this.toggleScoreDisplay();
		$("button.start").css("opacity", game.opacityLow);

		setTimeout(function(){
			that.flash($(that.shape+correctPad), 4, 300, correctPad);
		}, 500);
	},
	updateHighScoreInDb: function(score) {
		var that = this,
		    highScore;
		
		database.ref('high-score').once('value').then(function(snapshot){
			highScore = snapshot.val().score;
			if (score > highScore) {
				database.ref('high-score').set({
					score: score
				});
				
				that.updateHighScoreDisplay(score);
			}
		})
	},
	updateScore: function() {
		$(".score").html(this.score);
	},
	updateHighScoreDisplay: function(highScore) {
		$(".high-score").html(highScore);
	},
	playSound: function(clip) {
		var sound = $(".sound"+clip)[0];
		sound.currentTime = 0;
		sound.play();
	},
	toggleScoreDisplay: function() {
		if (this.power) {
			$(".score").html("--");
		} else {
			$(".score").html("");
		}
	},
	powerOff: function() {
		$("button.power").css("opacity", game.opacityLow);
		$("button.start").css("opacity", game.opacityLow);
		this.power = false;
		this.inGame = false;
		this.toggleScoreDisplay();
	},
	powerOn: function() {
		$("button.power").css("opacity", game.opacityHigh);
		this.power = true;
		this.reset();
		this.toggleScoreDisplay();
	},
	reset: function() {
		this.playerTurn = false;
		this.sequence = [];
		this.currIdx = 0;
		this.score = 0;
	}
}

$(document).ready(function() {
	database.ref('high-score').once('value').then(function(snapshot){
		var highScore = snapshot.val().score;
		game.updateHighScoreDisplay(highScore);
	})
	
	$("button.power").click(function() {
		game.power = !game.power;
		if (game.power) {
			$(".power-indicator").css("opacity", game.opacityHigh);
			game.powerOn();
		} else {
			$(".power-indicator").css("opacity", game.opacityLow);
			game.powerOff();
		}
	})
	
	$("button.start").click(function() {
		if (game.power && !game.inGame) {
			$(this).css("opacity", game.opacityHigh);
			game.init();
		}
	})
})