(function($) {

    function getRandomNumber(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomBackground(max) {
		let randomNumber = getRandomNumber(1, max);

		return 'progressbar-background-' + randomNumber;
    }

    function getDayOfWeekName() {
        const today = new Date();
        const dayName = today.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
        return dayName;
    }

    function getWeekdayBackground() {
		let weekday = getDayOfWeekName();

		return 'progressbar-background-' + weekday;
    }

	$.fn.progressBar = function(options) {
		
		var defaults = {
			show: false,
			dowBackground: false,
			randomBackground: false,
			blinkMessage: false,
			blinkOverlay: false,
			message : undefined,
			backgroundClass: 'progressbar-background-default',
			overlayClass: 'progressbar-overlay-default'
		};

		var settings = $.extend({}, defaults, options);

        if (settings.randomBackground == true) {
    		settings.backgroundClass = getRandomBackground(12);
        }

        if (settings.dowBackground == true) {
		    settings.backgroundClass = getWeekdayBackground();
        }

		var $container = this;

		var $progressbar = $('<div />', {
			class: settings.backgroundClass
		});

		var $progressBarOverlay = $('<div />', {
			class: settings.overlayClass
		});


		$progressBarOverlay.append($progressbar);

		if (settings.message != undefined) {
            var $messageText = $('<span>').html(settings.message);

            if (settings.blinkMessage != false) {
                $messageText.addClass("blink");
            }

            $progressBarOverlay.append($messageText);
        }

        if (settings.blinkOverlay != false) {
            $progressBarOverlay.addClass("blink");
        }

		$container.append($progressBarOverlay);

		console.log ('settings.show == ' + settings.show);
		console.log ('settings.backgroundClass == ' + settings.backgroundClass);

		if (settings.show == false) {
			$container.hide();
		}

		$container.data('progressBarMethods', {
			show: function () {
				$container.show();
			},
			hide: function () {
				$container.hide();
			},
			toggle: function () {
				$container.toggle();
			}
		});

		return this;
	};

}(jQuery));
