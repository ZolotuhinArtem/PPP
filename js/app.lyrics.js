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
						var prefix = "Lyric for " + artistName + " - " + trackName + ":\n";
						var text = "" + data.lyric;
						if (text) {
							console.log(logtag + ": getLyrics: responce: success");
							onSuccess(text)
						} else {
							onError("Lyric for " + artistName + " - " + trackName + " not found!");
						}
					}, 
					error: function(jqXHR, textStatus, errorThrown) { 
						console.log(logtag + ": getLyrics: responce: error: " + errorThrown);
						onError("Not found! " + errorThrown);
					} 
				}); 
			} else {
				console.log(logtag + ": getPosts: missing arguments");
				onError("Error: missing arguments!");
			}
			
		}

	};
}());
