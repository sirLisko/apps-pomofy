/*global jQuery, getSpotifyApi*/

(function($){
	"use strict";
	var sp = getSpotifyApi();
	var models = sp.require("sp://import/scripts/api/models");

	var player = models.player;

	var playerButton = $(".start");
	var time = 1499, tick;
	var mins = Math.floor(time/60);
	var secs = time%60;
	var timer = $(".timer");

	function playOrPause() {
		if(playerButton.text() === "Stop"){
			player.playing = false;
			clearInterval(tick);
			playerButton.text("Play");
		} else {
			ticker();
			player.playing = true;
			playerButton.text("Stop");
		}
	}

	function two(x) {
		return ((x > 9) ? "" : "0") + x;
	}

	function ticker(){
		tick = setInterval(function(){
			timer.text(two(mins) + ":" + two(secs));
			if(!(secs--)){
				if(!(mins--)){
					clearInterval(tick);
					player.playing = false;
					playerButton.text("Go!");
					time = 1499;
				}
				secs = 59;
			}
		}, 1000);
	}

	$(".start").on("click", playOrPause);
})(jQuery);