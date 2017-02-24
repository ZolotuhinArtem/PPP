;(function(){
	App.Ui = function Ui(){
		this.trackList = $("#track_list");
		this.lyricsTextArea = $("#lyrics-textarea");
		this.mainPageId = "mainPage";
		this.trackPageId = "trackPage";
		this.lyricsPageId = "lyricsPage";
	}
	
	App.Ui.prototype = {
		logtag: "App.Ui",
		
		onClickTrack: function onClickTrack(index){},
		

		setOnBtnSortByTitleClick: function(onClick){
			$("#btn_sort_by_title").on("click", onClick);
		},
		setOnBtnSortByArtistClick: function(onClick){
			$("#btn_sort_by_artist").on("click", onClick);
		},
		
		setOnBtnSortByAlbumClick: function(onClick){
			$("#btn_sort_by_album").on("click", onClick);
		},
		setOnBtnAudioPrevClick: function(onClick){
			$("#btn-prev-track").on("click", onClick);
		},
		setOnBtnAudioNextClick: function(onClick){
			$("#btn-next-track").on("click", onClick);
		},
		setOnBtnLyricsSearchClick: function(onClick) {
			$("#lyrics-search-btn").on("click", onClick);
		},
		setOnBtnLyrics: function(onClick) {
			$("#btn-lyrics").on("click", onClick);
		},
		setOnBtnTrackMainPageClick: function(onClick) {
			$("#btn-track-main").on("click", onClick);
		},
		setOnBtnTrackLyricPageClick: function(onClick) {
			$("#btn-track-lyric").on("click", onClick);
		},
		setTextLyrics: function(text) {
			$("#lyrics-text").text(text);
		},
		setArtistLyrics: function(artistName) {
			$("#lyrics-artist").attr("value", artistName);
		},
		setTrackLyrics: function(trackName) {
			$("#lyrics-track").attr("value", trackName);
		},
		getArtistLyrics: function() {
			return $("#lyrics-artist").attr("value");
		},
		getTrackLyrics: function() {
			return $("#lyrics-track").attr("value");
		},
		setCover: function(url) {
			$("#img-cover").attr("src", url);
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
	    		}
	    		console.log(this.trackList.attr("id"));
	    		this.trackList.listview('refresh');
	    	} else {
	    		alert("Tracks not found on your device");
	    	}
	    	
	    },
	    updateTrack: function (track) {
	    	console.log("update track called");
	    	$("#img-cover").attr("src", "res/img/track_template.png");
	    	$("#track_title").text(track.title);
	    	$("#track_album").text(track.album);
	    	$("#btn-track-main").text("Track: " + track.artists[0] + " - " + track.title);
	    	$("#btn-track-lyric").text("Track: " + track.artists[0] + " - " + track.title);
	    	$("#track_artist").text(track.artists[0]);
	    },
	    updateMainPage: function () {
	    	this.trackList.listview("refresh");
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
		
		changePage: function changePage(pageId) {
	    	tau.changePage("#" + pageId);
	    }
	    
    };
}());