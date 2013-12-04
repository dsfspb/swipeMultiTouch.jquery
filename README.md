swipeMultiTouch.jquery
======================

Plugin of jQuery, it can call a callback when a swipe multitouch event done

Example:
```
$('#target').swipeMultiTouch(function( event ){
  	$(event.target).text( '[swipeMultiTouch] with '+ event.number_touches +' fingers!!!');
});
```
