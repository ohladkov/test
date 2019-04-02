export default class Controls {
  constructor(context, $prevBtn, $nextBtn, prevFn, nextFn) {
    this.$prevBtn = $prevBtn;
    this.$nextBtn = $nextBtn;
    this.prevFn = prevFn.bind(context);
    this.nextFn = nextFn.bind(context);

    this.init();
  }

  init() {
    this.prev();
    this.next();
  }

  prev() {
    this.$prevBtn.on('click', (e) => {
      e.preventDefault();

      return this.prevFn();
    });
  }

  next() {
    this.$nextBtn.on('click', (e) => {
      e.preventDefault();

      return this.nextFn();
    });
  }
}
