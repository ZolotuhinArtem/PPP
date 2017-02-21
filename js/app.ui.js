;(function(){
	App.Ui = function Ui(){
		this.trackList = $("#track_list");

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
	    		this.trackList.listview('refresh');
//		    		list.listview("refresh");
	    	} else {
	    		alert("Tracks not found on your device");
	    	}
	    	
	    },
	    updateTrackPage: function (track) {
	    	console.log("update track called")
	    	$("#track_attributes_list_view").listview("refresh");
	    	$("#track_title").text(track.title);
	    	$("#track_album").text(track.album);
	    	$("#track_artist").text(track.artists[0]);
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