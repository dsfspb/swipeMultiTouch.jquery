(function( $ ){

	var SwipeMultiTouch = {
		'thresholdSwipeMultiTouch': 700,
		'default_settings': {
			'eventTriggered': {
				'swipe': false,
				'multiTouch': false,
			},
			'started': 0,
			'number_touches': 0
		},
		'elements': {}
	};

	$.fn.swipeMultiTouch = function( fn ){

		var $target = this;

		var __start = function( event ){
			var $target = $(event.target);
			var now = ((new Date()).getTime());
			var swipeMultiTouchIdentifier = $target.data('swipeMultiTouchIdentifier');
			if( typeof swipeMultiTouchIdentifier === 'undefined' ){
				swipeMultiTouchIdentifier = now;
				$target.data('swipeMultiTouchIdentifier', swipeMultiTouchIdentifier );
				SwipeMultiTouch.elements[ swipeMultiTouchIdentifier ] = KUtils.objClone( SwipeMultiTouch.default_settings );
			}

			var swipeMultiTouch = SwipeMultiTouch.elements[ swipeMultiTouchIdentifier ];

			if( swipeMultiTouch.number_touches == 0 )
				SwipeMultiTouch.elements[ swipeMultiTouchIdentifier ].started = now;
			SwipeMultiTouch.elements[ swipeMultiTouchIdentifier ].number_touches++;

			$target.text( 'Dita in pressione: '+ SwipeMultiTouch.elements[ swipeMultiTouchIdentifier ].number_touches );

			//	Dopo la soglia devo resettare il numero di touches
			setTimeout(function(){
				__resetNumberTouches( swipeMultiTouchIdentifier );
			}, SwipeMultiTouch.thresholdSwipeMultiTouch);
		};

		var __end = function( event ){
			var $target = $(event.target);
			var swipeMultiTouchIdentifier = $target.data('swipeMultiTouchIdentifier');
			__resetNumberTouches( swipeMultiTouchIdentifier );
		};

		var __resetNumberTouches = function( swipeMultiTouchIdentifier ){
			SwipeMultiTouch.elements[ swipeMultiTouchIdentifier ].number_touches = 0;
			//$target.text( 'Dita in pressione: '+ SwipeMultiTouch.elements[ swipeMultiTouchIdentifier ].number_touches );
		};

		$(document).on({
			'mousedown': function( event ){
				__start( event );
			},
			'mouseup': function( event ){
				__end( event );
			},
			'touchstart': function( event ){
				__start( event );
			},
			'touchend': function( event ){
				__end( event );
			}
		}, $target );

		$target.swipe(function( event ){
			var $target = $(event.target);
			var swipeMultiTouchIdentifier = $target.data('swipeMultiTouchIdentifier');
			var swipeMultiTouch = SwipeMultiTouch.elements[ swipeMultiTouchIdentifier ];
			var Timestamps = {
				'multiTouch': swipeMultiTouch.started,
				'swipe': event.timeStamp
			};

			console.log( 'swipe!', Timestamps );

			//	Se l'intervallo dall'inizio dell'evento "multiTouch" all'evento dello "swipe" è inferiore della soglia allora l'evento "swipeMultiTouch" è avvenuto! :D
			if( (swipeMultiTouch.number_touches>1) && (Timestamps.swipe - Timestamps.multiTouch) <= SwipeMultiTouch.thresholdSwipeMultiTouch ){
				event.type = event.handleObj.origType = event.handleObj.type = 'swipeMultiTouch';
				event.originalEvent = undefined;
				event.number_touches = swipeMultiTouch.number_touches;
				fn( event );
			}

			SwipeMultiTouch.elements[ swipeMultiTouchIdentifier ] = KUtils.objClone( SwipeMultiTouch.default_settings );
		})

	};

})( jQuery );
