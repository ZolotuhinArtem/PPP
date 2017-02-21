;var App = null;

(function(){
	"use strict";
	
	App = function App(){
		this.tracks = [];
		this.trackListId = "track_list";
		this.currentTrack = null;
	};
	App.prototype = {
		logtag: "App",
		libs: [
		       'js/app.model.js',
		       'js/app.ui.js',
		       'js/app.trackUtils.js',
		       'js/app.audio.js'
		],
	
		init: function init(){

	    	var self = this;
			this.model = new App.Model();
			this.ui = new App.Ui(); 
			this.trackUtils = new App.TrackUtils();
			this.audio = new App.Audio();
			
			this.configureBackButton();
	   		this.ui.setOnBtnSortByTitleClick(function(e) {
	   			self.tracks = self.trackUtils.sortByTitle(self.tracks);
	   			self.ui.showTracks(self.tracks);
	   		});
	   		this.ui.setOnBtnSortByArtistClick(function(e) {
	   			self.tracks = self.trackUtils.sortByArtist(self.tracks);
	   			self.ui.showTracks(self.tracks);
	   		});
	   		this.ui.setOnBtnSortByAlbumClick(function(e) {
	   			self.tracks = self.trackUtils.sortByAlbum(self.tracks);
	   			self.ui.showTracks(self.tracks);
	   		});
	   		
	   		this.audio.setOnEnded(function(){
	   			self.currentTrack = self.getNextTrack(self.currentTrack);
	   			self.audio.setAndPlay(self.currentTrack.contentURI);
	   			self.ui.updateTrackPage(self.currentTrack);
	   		})
	   		
	   		this.ui.onClickTrack = function (index) {
	   			var track = self.tracks[index];
	   			self.currentTrack = track;
	   			self.ui.updateTrackPage(track);
	   			self.ui.changePage(self.ui.trackPageId);
	   			self.audio.setAndPlay(track.contentURI);
	   		};
	   		function onSearchTracks(trackArray){
				if (trackArray.length > 0) {
					for(var i = 0; i < trackArray.length; i++) {
						console.log(self.logtag + ": init: onSearchTracks: Finded " + trackArray[i].title + trackArray[i].artists[0]);
						self.tracks.push(trackArray[i]);
					}
					var list;
					list = document.getElementById(self.trackListId);
					
					self.tracks = self.trackUtils.sortByTitle(self.tracks);
					self.ui.showTracks(self.tracks);
				} else {
					console.log(self.logtag + ": init: onSearchTracks: No in tracks");
				}
			}
	   		
	   		function onErrorSearchTracks(){
	   			console.log(self.logtag + ": init: onErrorSearchTracks: error search tracks");
	   		}
	   		
			this.model.searchTracks(onSearchTracks, onErrorSearchTracks);
			
			
		},
		
		configureBackButton: function configureBackButton(){
		    window.addEventListener( 'tizenhwkey', function( ev ) {
		        if( ev.keyName === "back" ) {
		            var activePopup = document.querySelector( '.ui-popup-active' ),
		                page = document.getElementsByClassName( 'ui-page-active' )[0],
		                pageid = page ? page.id : "";
	
		            if( pageid === this.ui.mainPageId && !activePopup ) {
		                try {
		                	if (confirm("Exit?")) {
		                		tizen.application.getCurrentApplication().exit();
		                	}
		                } catch (ignore) {
		                }
		            } else {
		                window.history.back();
		            }
		        }
		    });
		},
		getNextTrack: function getNextTrack(currentTrack) {
	    	for (var i = 0; i < this.tracks.length; i++){
	    		if(this.tracks[i].contentURI === currentTrack.contentURI) {
	    			if (i < this.tracks.length - 1) {
	    				return this.tracks[i + 1];
	    			}
	    		}
	    	}
	    	return this.tracks[0];
	    }
	};
	
}());