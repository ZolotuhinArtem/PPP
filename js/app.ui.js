;(function(){
	App.Ui = function Ui(){
		this.trackList = $("#track_list");
	}
	
	App.Ui.prototype = {
			
		onClickTrack: function onClickTrack(index){},
		
		showTracks: function (trackArray){
	    	if (trackArray.length > 0) {
	    		console.log("showTracks: Cleaning list...");
	    		//list.empty();
	    		this.trackList.empty();
	    		console.log("showTracks: Ok!");
	    		var li;
	    		for(var i = 0; i < trackArray.length; i++) {
	    			li = document.createElement('li');
	    			li.innerText = this.getFormatedTrackName(trackArray[i]);
	    			li.setAttribute('class', 'ui-li-static');
	    			li.addEventListener('click', this.onClickTrack.bind(null, i), false);
	    			this.trackList.append(li);
	    			console.log("showTracks: appended in listview " + this.getFormatedTrackName(trackArray[i])); 
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
	    }
	    
    };
}());