import defaults from './defaults';
import Controls from './controls';

const SliderPlugin = (($) => {
  const pluginName = 'slider';

  const init = () => {
    class Slider {
      constructor(element, options) {
        this.$element = $(element);
        this._name = pluginName;
        this._defaults = $.fn[pluginName].defaults;
        this.options = $.extend({}, this._defaults, options);

        this.$sliderWrap = this.$element.find('.slider-wrap');
        this.$slides = this.$sliderWrap.find('.slider-slide');
        this.slideWidth = this.$slides.first().width();
        this.$prevBtn = this.$element.find('.slider-prev');
        this.$nextBtn = this.$element.find('.slider-next');

        this.currentSlideIndex = 0;
        this.slidesTotal = this.$slides.length - 1;

        this.init();
      }

      init() {
        this.controls = new Controls(
          this,
          this.$prevBtn,
          this.$nextBtn,
          this.prev,
          this.next
        );
      }

      prev() {
        this.updateCurrentSlideIndex(this.currentSlideIndex - 1);
        this.move();
      }

      next() {
        this.updateCurrentSlideIndex(this.currentSlideIndex + 1);
        this.move();
      }

      move() {
        this.$sliderWrap.css({
          transform: `translate(-${this.slideWidth * this.currentSlideIndex}px)`
        });
      }

      updateCurrentSlideIndex(index) {
        this.currentSlideIndex = index;

        if (this.currentSlideIndex < 0) {
          this.currentSlideIndex = 0;
        }

        if (this.currentSlideIndex > this.slidesTotal) {
          this.currentSlideIndex = this.slidesTotal;
        }

        return this.currentSlideIndex;
      }
    }

    $.fn[pluginName] = function(options) {
      this.each(function() {
        if (!$.data(this, 'plugin_' + pluginName)) {
          /*
        Use "$.data" to save each instance of the plugin in case
        the user wants to modify it. Using "$.data" in this way
        ensures the data is removed when the DOM element(s) are
        removed via jQuery methods, as well as when the userleaves
        the page. It's a smart way to prevent memory leaks.

        More: http://api.jquery.com/jquery.data/
        */
          $.data(this, 'plugin_' + pluginName, new Slider(this, options));
        }
      });
      /*
      "return this;" returns the original jQuery object. This allows
      additional jQuery methods to be chained.
    */
      return this;
    };

    $.fn[pluginName].defaults = defaults;
  };

  return {
    init
  };
})(jQuery);

export default SliderPlugin;
