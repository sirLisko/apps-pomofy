/*global getSpotifyApi*/

(function(){
	"use strict";
	var sp = getSpotifyApi();
	var models = sp.require("sp://import/scripts/api/models");

	var player = models.player;

	var playerButton = document.getElementById("start");
	var time = 1499, tick;
	var mins = Math.floor(time/60);
	var secs = time%60;
	var timer = document.getElementById("timer");

	function playOrPause() {
		if(playerButton.innerText === "Stop"){
			player.playing = false;
			clearInterval(tick);
			playerButton.innerText = "Play";
		} else {
			ticker();
			player.playing = true;
			playerButton.innerText = "Stop";
		}
	}

	function two(x) {
		return ((x > 9) ? "" : "0") + x;
	}

	function ticker(){
		tick = setInterval(function(){
			timer.innerText = two(mins) + ":" + two(secs);
			if(!(secs--)){
				if(!(mins--)){
					clearInterval(tick);
					player.playing = false;
					playerButton.innerText = "Go!";
					mins = 24;
				}
				secs = 59;
			}
		}, 1000);
	}

	playerButton.addEventListener("click", playOrPause, false);
})();