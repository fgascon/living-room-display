var $ = jQuery;

$(onReady);

function onReady(){
	var $window = $(window);
	var $wrapper = $('#wrapper');
	var $photos = $('#photos');
	var $clock = $('#clock');
	
	function resetHeight(){
		$wrapper.height($window.height());
	}
	
	$window.resize(resetHeight);
	resetHeight();
	
	function renderClockTime(){
		$clock.html((new Date()).toLocaleTimeString());
	}

	setTimeout(renderClockTime, 0);
	setInterval(renderClockTime, 1000);
	
	var PHOTO_CHANGE_INTERVAL = 8000;
	var PHOTO_FADE_TIME = 2000;
	var FETCH_PHOTOS_INTERVAL = 8000;
	
	function renderPhoto(photo){
		var oldPhotos = $photos.find('img');
		$('<img>').hide().attr('src', photo).appendTo($photos).on('load', function(){
			$(this).fadeIn(PHOTO_FADE_TIME, function(){
				oldPhotos.remove();
			});
		});
	}
	
	var photoList = [];
	var currentPhotoIndex = 0;
	
	function showNextPhoto(){
		if(photoList.length == 0) return;
		if(currentPhotoIndex >= photoList.length){
			currentPhotoIndex = 0;
		}
		renderPhoto('/photos/'+photoList[currentPhotoIndex++]);
	}
	
	function fetchPhotoList(callback){
		$.get('/photo/list', function(photos){
			photoList = photos;
			if(callback) callback();
		});
	}
	fetchPhotoList(function(){
		setInterval(showNextPhoto, PHOTO_CHANGE_INTERVAL);
		showNextPhoto();
	});
	
	setInterval(fetchPhotoList, FETCH_PHOTOS_INTERVAL);
}