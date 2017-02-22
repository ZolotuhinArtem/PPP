;(function(){
	"use strict";
	App.Lyrics = function Lyrics(){
		
	};
	App.Lyrics.prototype = {
		
		/*
		 * @param {string} artistName
		 * @param {string} trackName
		 * @param {function} onSucces
		 * 		@param {string} text
		 * @param {function} onError
		 */
		getLyrics: function getLyrics(artistName, trackName, onSuccess, onError){ 
			var logtag = "App.Lyrics";
			if (artistName && trackName) {
				console.log(logtag + ": getLyrics: getted " + artistName + " - " + trackName);
				$.ajax({ 
					url: "http://lyric-api.herokuapp.com/api/find/" + artistName +"/" + trackName, 
					type: "GET",  
					dataType: "json",
					success: function(data) { 
						var text = "" + data.lyric;
						if (text) {
							console.log(logtag + ": getLyrics: responce: success");
							onSuccess(text)
						} else {
							onError("Lyric for " + artistName + " - " + trackName + " not found!");
						}
					}, 
					error: function(data) { 
						console.log(logtag + ": getLyrics: responce: error");
						onError(data);
					} 
				}); 
			} else {
				console.log(logtag + ": getPosts: missing arguments");
				onError("Error: missing arguments!");
			}
			
		}

	};
}());
