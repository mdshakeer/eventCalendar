/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */


// the semi-colon before the function invocation is a safety 
// net against concatenated scripts and/or other plugins 
// that are not closed properly.
;(function ( $, window, document, undefined ) {
    
    // undefined is used here as the undefined global 
    // variable in ECMAScript 3 and is mutable (i.e. it can 
    // be changed by someone else). undefined isn't really 
    // being passed in so we can ensure that its value is 
    // truly undefined. In ES5, undefined can no longer be 
    // modified.
    
    // window and document are passed through as local 
    // variables rather than as globals, because this (slightly) 
    // quickens the resolution process and can be more 
    // efficiently minified (especially when both are 
    // regularly referenced in your plugin).

    // Create the defaults once
    var eventcalendar = 'eventcalendar',
        defaults = {
        	days : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			months : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			width: 420,
			height: 400
        };

    // The actual plugin constructor
    function Eventcalendar( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the 
        // contents of two or more objects, storing the 
        // result in the first object. The first object 
        // is generally empty because we don't want to alter 
        // the default options for future instances of the plugin
        this.VERSION = '1.0.0';
        this.options = $.extend( {}, defaults, options);
        this.today = new Date();
		this._minWidth = 360;
		this._minHeight = 250;
        
        this._defaults = this.options;
        this._name = eventcalendar;
        
        this.init();
    }

    Eventcalendar.prototype = {
    	init: function () {
	        // Place initialization logic here
	        // You already have access to the DOM element and
	        // the options via the instance, e.g. this.element 
	        // and this.options
			this.month = (isNaN(this.options.month) || this.options.month === null) ? this.today.getMonth() : this.options.month - 1;
			this.year = (isNaN(this.options.year) || this.options.year === null) ? this.today.getFullYear() : this.options.year;
			this._initEvents();
	    },

	    _initEvents: function() {
	    	$ele = $(this.element);
	    	$defaults = this._defaults;
	    	if( ($defaults["width"] > this._minWidth) && ($defaults["width"] < 	window.outerWidth) && ($defaults["height"] > this._minHeight) && ($defaults["height"] < window.outerHeight) ){
	    		$ele.css({"width":$defaults["width"]+"px","height":$defaults["height"]+"px"});
	    	}
	    	else{
	    		console.log("height X width is too small.. should be more than 360 X 440");
	    		$ele.css({"width":this._minWidth+"px","height":this._minHeight+"px"});
	    	}
	    	$top = $("<div class = 'col-md-12 col-lg-12 col-xs-12 calendar'></div>").appendTo($ele);
	    	$title = $("<div class = 'h3 col-md-12 col-lg-12 col-xs-12 calendarTitle paddingReset'><div class = 'col-md-12 col-lg-12 col-xs-12 text-center white paddingReset'><a href='#'><i class = 'fa fa-chevron-left white pull-left paddingReset'></i></a><span class = 'month_text'>"+ $defaults.months[this.month] + ", " + this.year +"</span><a href='#'><i class = 'fa fa-chevron-right white pull-right paddingReset'></i></a></div></div>").appendTo($top);
	    	$content = $("<div class = 'col-md-12 col-lg-12 col-xs-12 calendarContent paddingReset'></div>").appendTo($top);
	    	$weeks = $("<div class = 'col-md-12 col-lg-12 col-xs-12 paddingReset boxHighlight calendarWeek'></div>").appendTo($content);
	    	for (x in $defaults.days) {
	    		$("<div class = 'col-date text-center text-muted'>"+ $defaults.days[x].substring(0,3) + "<span>" + $defaults.days[x].substring(3,$defaults.days[x].length) +" </span>" +"</div>").appendTo($weeks);
			}
	    	for (row = 0; row < 5; row++) {
			    $row = $("<div class = 'col-md-12 col-lg-12 col-xs-12 paddingReset boxHighBorder dateRow'></div>").appendTo($content);
			    for (col = 0; col < 7; col++) {
			    	$("<div class = 'col-md-12 col-lg-12 col-xs-12 paddingReset col-date-content text-center'><span></span></div>").appendTo($row);
			    }
			}
			$rows = $content.find(".dateRow");
			this._setDays(this.year,this.month);
	    },

	    _setDays: function(year,month) {
	    	start = new Date(year,month).getDay();
	    	start_day = 1;
	    	end_day = new Date(year,month+1,0).getDate();
	    	var break_loop = false;
	    	for (row = 0; row < 5; row++){
	    		$row = $($rows[row]).children();
	    		for (col = start; col < 7; col++) {
	    			$($row[col]).find("span").html(start_day);
	    			start_day++;
	    			if (start_day > end_day) {
	    				break_loop = true;
	    				break;
	    			};
	    		}
	    		if (break_loop) {
	    			break;
	    		}
	    		start = 0;
	    	}
	    	for(var i=0;start_day <= end_day;start_day++,i++){
	    		$(".dateRow").first().children().eq(i).find("span").html(start_day);
	    	}
	    },
	    gotoPreviousMonth : function(callback){
			this._move('month', 'previous', callback);
		},
		gotoNextMonth : function(callback){
			this._move('month', 'next', callback);
		}
    };


    var logError = function(message){
		throw new Error(message);
	};

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[eventcalendar] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + eventcalendar)) {
                $.data(this, 'plugin_' + eventcalendar, 
                new Eventcalendar( this, options ));
            }
        });
    }

})( jQuery, window, document );
