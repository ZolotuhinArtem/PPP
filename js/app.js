;var App = null;

(function(){
	"use strict";
	
	App = function App(){
		this.tracks = [];
		this.currentTrack = null;
		this.coverTemplate = "res/img/track_template.png";
	};
	App.prototype = {
		logtag: "App",
		libs: [
		       'js/app.model.js',
		       'js/app.ui.js',
		       'js/app.trackUtils.js',
		       'js/app.lyrics.js',
		       'js/app.audio.js',
		       'js/app.albumcover.js'
		],
	
		init: function init(){

	    	var self = this;
	    	
			this.model = new App.Model();
			this.ui = new App.Ui(); 
			this.trackUtils = new App.TrackUtils();
			this.audio = new App.Audio();
			this.lyrics = new App.Lyrics();
			this.albumcover = new App.AlbumCover();
			
			this.ui.setOnBtnTrackPageClick(function(){
				self.ui.changePage("trackPage");
			})
			
			this.configureBackButton(this);
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
	   		function nextTrack(){
	   			playTrack(self.getNextTrack(self.currentTrack));
	   		}
	   		
	   		function prevTrack(){
	   			playTrack(self.getPrevTrack(self.currentTrack));
	   		}
	   		
	   		
	   		function playTrack(track) {
	   			self.currentTrack = track;
	   			self.audio.setAndPlay(self.currentTrack.contentURI);
	   			self.ui.updateTrackPage(self.currentTrack);
	   			if ((self.ui.getArtistLyrics() == "") && (self.ui.getTrackLyrics() == "")){
	   				self.ui.setArtistLyrics(track.artists[0]);
	   				self.ui.setTrackLyrics(track.title);
	   			}
	   			
	   			var tempTrack = self.currentTrack;
	   			self.albumcover.getCover(self.currentTrack.artists[0], 
	   					self.currentTrack.title, 
	   					function(url) {
	   						if (tempTrack == self.currentTrack) {
	   							self.ui.setCover(url);
	   						} else {
	   							self.ui.setCover(self.coverTemplate);
	   						}
	   					}, function(){
	   						if (tempTrack == self.currentTrack) {
	   							self.ui.setCover(self.coverTemplate);
	   						}
	   					});
	   		}
	   		
	   		this.ui.setOnBtnAudioPrevClick(prevTrack);
	   		
	   		this.ui.setOnBtnAudioNextClick(nextTrack);
	   		
	   		this.audio.setOnEnded(nextTrack);
	   		
	   		
	   		this.ui.onClickTrack = function (index) {
	   			var track = self.tracks[index];
	   			self.ui.changePage(self.ui.trackPageId);
	   			playTrack(track);
	   		};
	   		
	   		this.ui.setOnBtnLyrics(function (){
	   			self.ui.changePage("lyricsPage");
   				self.ui.setArtistLyrics(self.currentTrack.artists[0]);
   				self.ui.setTrackLyrics(self.currentTrack.title);
	   		});
	   		
	   		this.ui.setOnBtnLyricsSearchClick(function(){
	   			self.ui.setTextLyrics("Loading...");
	   			function onSuccess(data){
   					self.ui.setTextLyrics(data);
	   			}
	   			function onError(data){
	   				self.ui.setTextLyrics(data);
	   			}
	   			self.lyrics.getLyrics(self.ui.getArtistLyrics(), 
	   					self.ui.getTrackLyrics(), onSuccess, onError);
	   		});
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
		
		configureBackButton: function configureBackButton(context){
		    window.addEventListener( 'tizenhwkey', function( ev ) {
		        if( ev.keyName === "back" ) {
		            var activePopup = document.querySelector( '.ui-popup-active' ),
		                page = document.getElementsByClassName( 'ui-page-active' )[0],
		                pageid = page ? page.id : "";
	
		            if( pageid === context.ui.mainPageId && !activePopup ) {
		                try {
		                	if (confirm("Exit?")) {
		                		tizen.application.getCurrentApplication().exit();
		                	}
		                } catch (ignore) {
		                }
		            } else {
		            	context.ui.updateMainPage();
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
	    },
		getPrevTrack: function getNextTrack(currentTrack) {
	    	for (var i = 0; i < this.tracks.length; i++){
	    		if(this.tracks[i].contentURI === currentTrack.contentURI) {
	    			if (i > 0) {
	    				return this.tracks[i - 1];
	    			}
	    		}
	    	}
	    	return this.tracks[this.tracks.length - 1];
	    }
	};
	
}());