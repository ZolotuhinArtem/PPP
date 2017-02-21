;(function(){
	"use strict";
	App.Lyrics = function Lyrics(){
		
	};
	App.Lyrics.prototype = {
		getTextMusic: function getTextMusic(artistName, trackName, onSuccess, onError){
			console.log("getPosts"); 
			$.ajax({ 
				url: "http://api.lololyrics.com/0.5/getLyric?artist="+ artistName +"&track=" + trackName,
				type: "GET", 
				dataType: "json", 
				success: onSuccess,
				error: onError
			}); 
		}
	};
}());
