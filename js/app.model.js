;(function(){
	"use strict";
	App.Model = function Model(){
		
	};
	
	App.Model.prototype = {
		/*
		 * @param {function} onSearchTracks
		 */
		searchTracks: function (onSuccessSearchTracks, onErrorSearchTracks){
	    	tizen.content.getDirectories(function (folders){
	        	var filter = new tizen.AttributeFilter ("type", "EXACTLY", "AUDIO");
	        	var sortMode = new tizen.SortMode('title', 'ASC');
	        	for (var i = 0; i < folders.length; i++) {
	        		try{
	    	    		tizen.content.find(onSuccessSearchTracks, onErrorSearchTracks, folders[i].id, filter, sortMode);
	        		} catch (exc) {
	        			console.warn('tizen.content.find exception: ' + exc.message);
	        		}
	        	}
	        }, function (){
	        	console.log("searchTracks: error");
	        	});
	    }
	};
	
	
}());