// This is an examples of simple export.
//
// You can remove or add your own function in this file.

const Slider = (($) => {
  const init = () => $('.slider').slider({controls: false});

  return {
    init,
  };
})(jQuery);

export default Slider;
