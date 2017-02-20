
var App = null;

(function(){
	"use strict";
	
	App = function App(){
		this.tracks = [];
		this.mainPageId = "mainPage";
		this.trackPageId = "trackPage";
		this.contentMainId = "content_main";
		this.contentTrackId = "content_track";
		this.trackListId = "track_list";
		this.currentPage = this.mainPageId;
		this.currentTrack = null;
	};
	App.prototype = {
		libs: [
		       'js/app.model.js',
		       'js/app.ui.js',
		       'js/app.trackUtils.js',
		       'js/app.audio.js'
		],
	
		init: function init(){
			this.model = new App.Model();
			this.ui = new App.Ui(); 
			this.trackUtils = new App.TrackUtils();
			this.audio = new App.Audio();
			
			this.configureBackButton();
			
			var pageMain = document.getElementById(this.mainPageId);
	    	var pageTrack = document.getElementById(this.trackPageId);
	    	var contentMain = document.getElementById(this.contentMainId);
	    	var contentTrack = document.getElementById(this.contentTrackId);
	    	
	    	var self = this;
	    	
	    	this.bindSwipe(pageMain, contentMain, function (direction) {
	    		if (direction == "left") {
	    			self.goToPage(self.mainPageId, self.trackPageId);
	    		}
	    	});
	    	this.bindSwipe(pageTrack, contentTrack, function (direction) {
	    		if (direction == "right") {
	    			if (self.currentPage == self.trackPageId){
	    				self.currentPage = self.mainPageId;
	    				window.history.back();
	    			}
	    		}
	    	});
	    	
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
	   			self.goToPage(self.currentPage, self.trackPageId);
	   			self.audio.setAndPlay(track.contentURI);
	   		};
	   		function onSearchTracks(trackArray){
				if (trackArray.length > 0) {
					for(var i = 0; i < trackArray.length; i++) {
						console.log("Finded: " + trackArray[i].title);
						self.tracks.push(trackArray[i]);
					}
					var list;
					list = document.getElementById(self.trackListId);
					
					self.tracks = self.trackUtils.sortByTitle(self.tracks);
					self.ui.showTracks(self.tracks);
				} else {
					console.log("No in tracks");
				}
			}
	   		
	   		function onErrorSearchTracks(){
	   			console.log("error search tracks");
	   		}
	   		
			this.model.searchTracks(onSearchTracks, onErrorSearchTracks);
			
			
		},
		
		configureBackButton: function configureBackButton(){
		    window.addEventListener( 'tizenhwkey', function( ev ) {
		        if( ev.keyName === "back" ) {
		            var activePopup = document.querySelector( '.ui-popup-active' ),
		                page = document.getElementsByClassName( 'ui-page-active' )[0],
		                pageid = page ? page.id : "";
	
		            if( pageid === this.mainPageId && !activePopup ) {
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
	    },
		
		goToPage: function goToPage(from, to) {
	    	if (this.currentPage == from) {
	    		this.currentPage = to;
	    		tau.changePage("#" + to);
	    	}
	    },
	    
	    bindSwipe: function bindSwipe(page, contentOfPage, onSwipe){
	    	/*
	    	 * page is element, which has data-role="page"
	    	 * contentOfPage usually is element, which has data-role="content"
	    	 * it is call onSwipe(direction)
	    	 * direction: "left", "right"
	    	 */
	    	page.addEventListener("pagebeforeshow", function() {
	    		tau.event.enableGesture(contentOfPage, new tau.event.gesture.Swipe({
	    			orientation: "horizontal"
	    		}));
	    		
	    		contentOfPage.addEventListener("swipe", function(e) {
	    			console.log("swipe direction = " + e.detail.direction);
	    			onSwipe(e.detail.direction);
	    		});
	    	});
	    }
	    
	};
	
}());