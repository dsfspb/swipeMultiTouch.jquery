swipeMultiTouch.jquery
======================

Plugin of jQuery, it can call a callback when a swipe multitouch event done

Example:

$('#target')
	  .swipeMultiTouch(function( event ){
  		console.dir( event );
  		var $target = $(event.target);
  		$target.text( '[swipeMultiTouch] con '+ event.number_touches +' dita!!!');
	  });
