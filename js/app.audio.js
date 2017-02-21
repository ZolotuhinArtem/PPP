;(function(){
	"use strict";
	App.Audio = function Audio(){
		this.audioElement = $("#audio");
		this.currentTrack = null;
	};
	
	App.Audio.prototype = {
		logtag: "App.Audio",
		setOnPlay: function setOnPlay(onPlay){
			this.audioElement.on("playing", onPlay);
		},
		setOnPause: function setOnPause(onPause){
			this.audioElement.on("pause", onPause);
		},
		setOnTimeUpdate: function setOnTimeUpdate(onTimeupdate){
			this.audioElement.on("timeupdate", onTimeupdate);
		},
		setOnEnded: function setOnTimeUpdate(onEnded){
			this.audioElement.on("ended", onEnded);
		},
		setAndPlay: function play(trackURI) {
			if (trackURI) {
				this.audioElement.attr('src', trackURI);
				this.audioElement.get(0).play();
			} else {
				console.error(this.logtag + ": setAndPlay: error: invalid trackURI");
			}
		},
		stop: function stop(){
			this.audioElement.get(0).stop();
		},
		tooglePause: function pause() {
			 if (this.audioElement.get(0).paused) {
				 this.audioElement.get(0).play();
             }
             else {
            	 this.audioElement.get(0).pause();
             }
		},
		getCurrentPlayingDuration: function getCurrentPlayingDuration(){
			return this.audioElement.get(0).duration;
		},
		getCurrentPlayingTime: function getCurrentPlayingTime(){
			return this.audioElement.get(0).currentTime;
		}
	};
}());