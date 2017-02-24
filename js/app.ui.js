;(function(){
	App.Ui = function Ui(){
		this.trackList = $("#track_list");
		this.lyricsTextArea = $("#lyrics-textarea");
		this.mainPageId = "mainPage";
		this.trackPageId = "trackPage";
		this.lyricsPageId = "lyricsPage";
		this.activePageClass = "ui-section-active";
		this.activeTabClass = "ui-tab-active";
		
		this.imgCoverTemplate = "res/img/track_template.png";
		var pageElem = document.getElementById("mainPage");
		this.page = tau.widget.Page(pageElem);
		var sectionChangerElem = document.getElementById("section-changer");
		this.sectionChanger = tau.widget.SectionChanger(sectionChangerElem);
		this.btnSortByTitle = document.getElementById("btn_sort_by_title");
		this.btnSortByArtist = document.getElementById("btn_sort_by_artist");
		this.btnSortByAlbum = document.getElementById("btn_sort_by_album");
		this.btnPrevTrack = document.getElementById("btn-prev-track");
		this.btnNextTrack = document.getElementById("btn-next-track");
		this.btnLyricSearch = document.getElementById("lyrics-search-btn");
		this.lyricsTextArea = document.getElementById("lyrics-text");
		this.lyricsArtist = document.getElementById("lyrics-artist");
		this.lyricsTrack = document.getElementById("lyrics-track");
		this.lyricsFill = document.getElementById("lyrics-fill");
		this.imgCover = document.getElementById("img-cover");
		this.trackTitle = document.getElementById("track_title");
		this.trackAlbum = document.getElementById("track_album");
		this.trackArtist = document.getElementById("track_artist");
		this.audioElement = document.getElementById("audio");
	}
	
	App.Ui.prototype = {
		logtag: "App.Ui",
		
		onClickTrack: function onClickTrack(index){},
		
		getAudioElement: function(){
			return this.audioElement;
		},
		setOnBtnSortByTitleClick: function(onClick){
			this.btnSortByTitle.addEventListener("click", onClick, false);
		},
		setOnBtnSortByArtistClick: function(onClick){
			this.btnSortByArtist.addEventListener("click", onClick, false);
		},
		
		setOnBtnSortByAlbumClick: function(onClick){
			this.btnSortByAlbum.addEventListener("click", onClick, false);
		},
		setOnBtnAudioPrevClick: function(onClick){
			this.btnPrevTrack.addEventListener("click", onClick, false);
		},
		setOnBtnAudioNextClick: function(onClick){
			this.btnNextTrack.addEventListener("click", onClick, false);
		},
		setOnBtnLyricsSearchClick: function(onClick) {
			this.btnLyricSearch.addEventListener("click", onClick, false);
		},
		setOnBtnLyricsFillClick: function(onClick) {
			this.lyricsFill.addEventListener("click", onClick, false);
		},
		setTextLyrics: function(text) {
			this.lyricsTextArea.innerHTML = text;
		},
		setArtistLyrics: function(artistName) {
			this.lyricsArtist.setAttribute("value", artistName);
		},
		setTrackLyrics: function(trackName) {
			this.lyricsTrack.setAttribute("value", trackName);
		},
		getArtistLyrics: function() {
			return this.lyricsArtist.getAttribute("value");
		},
		getTrackLyrics: function() {
			return this.lyricsTrack.getAttribute("value");
		},
		setCover: function(url) {
			this.imgCover.setAttribute("src", url);
		},
		
		showTracks: function (trackArray){
	    	if (trackArray.length > 0) {
	    		console.log(this.logtag + ": showTracks: Cleaning list...");
	    		this.trackList.empty();
	    		console.log(this.logtag + ": showTracks: Ok!");
	    		console.log(this.logtag + ": showTracks: adding tracks")
	    		var li;
	    		for(var i = 0; i < trackArray.length; i++) {
	    			li = document.createElement('li');
	    			li.innerText = this.getFormatedTrackName(trackArray[i]);
	    			li.setAttribute('class', 'ui-li-static');
	    			li.addEventListener('click', this.onClickTrack.bind(null, i), false);
	    			this.trackList.append(li);
	    			console.log(this.logtag + ": showTracks: appended in listview " + this.getFormatedTrackName(trackArray[i]));
	    			this.trackList.listview('refresh');
	    		}
	    		console.log(this.trackList.attr("id"));
	    		
	    	} else {
	    		alert("Tracks not found on your device");
	    	}
	    	
	    },
	    updateTrack: function (track) {
	    	console.log("update track called");
	    	this.imgCover.setAttribute("src", this.imgCoverTemplate);
	    	this.trackTitle.innerHTML = track.title;
	    	this.trackAlbum.innerHTML = track.album;
	    	this.trackArtist.innerHTML = track.artists[0];
	    },
	    updatePage: function () {
	    	this.page.refresh();
	    	
	    },
	    deleteChilds : function (elem) {
	    	while (elem.firstChild) {
	    		elem.removeChild(elem.firstChild);
	    	}
	    	return elem;
	    }, 
	    getFormatedTrackName: function (track){
	    	return track.artists[0] + " - " + track.title + " - " + track.album;
	    },
		
	    /*
	     * @params {string} page: main, track, lyric
	     */
		changePage: function changePage(page) {
			
	    	var ind;
	    	if (page == "main") {
	    		console.log("selected page: main");
	    		ind = 0;
	    	}
	    	if (page == "track") {
	    		console.log("selected page: track");
	    		ind = 1;
	    	}
	    	if (page == "lyric") {
	    		console.log("selected page: lyric");
	    		ind = 2;
	    	}
	    	var pages = document.getElementsByClassName("section-page");
	    	var tabs = document.getElementsByClassName("tab");
	    	for(var i = 0; i < pages.length; i++) {
	    		pages[i].classList.remove(this.activePageClass);
	    		tabs[i].classList.remove(this.activeTabClass);
	    	}
	    	pages[ind].classList.add(this.activePageClass);
	    	tabs[ind].classList.add(this.activeTabClass);
	    	console.log(this.page.id);
	    	this.sectionChanger.setActiveSection(ind);
	    	this.updatePage();
	    }
	    
    };
}());