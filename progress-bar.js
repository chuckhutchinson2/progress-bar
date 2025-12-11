/**
 *
 * Copyright (c) 2025 Chuck Hutchinson
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit [creativecommons.org](creativecommons.org)
 * or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * The background images used in this plugin (see CSS file) were derived from https://www.svgbackgrounds.com/
 * See https://www.svgbackgrounds.com/elements/animated-svg-preloaders/
 */
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
