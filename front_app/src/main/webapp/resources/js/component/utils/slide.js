import Utils from '../../utils/utils.js';

export default class Slide {
  state = new Proxy({
    index: 0
  }, {
    set: (target, p, newValue, receiver) => {
      this[`${p}Set`](target, p, newValue, receiver);

      return true;
    }
  });

  constructor(selector, option) {
    this.root = document.querySelector(selector);
    this.option = option;

    this.slideWrapper = this.root.querySelector('.swiper-wrapper');
    this.slideItems = [...this.root.querySelectorAll('.swiper-wrapper .slide-item')].map((el, i, arr) => el.cloneNode(true));

    this.slideTime = this.option?.interval ? 1000 : (1000 / 2)

    this.onNextMouseDown = this.onNextMouseDown.bind(this);
    this.onNextMouseUp = this.onNextMouseUp.bind(this);
    this.onPrevMouseDown = this.onPrevMouseDown.bind(this);
    this.onPrevMouseUp = this.onPrevMouseUp.bind(this);
    this.onPaginationClick = this.onPaginationClick.bind(this);

    this.setWrapper();
    this.init();
  }

  slideInterval() {
    return setInterval(
      () => {
        this.state.index = (this.state.index + 1) % this.slideItems.length;
      }, this.option?.interval ?? 1000
    );
  }

  indexSet(target, p, newValue, receiver) {
    if (!this.isSlide || this.isPagination) {
      this.slide(target, p, newValue, receiver);

      target[p] = newValue;
    }
  }

  getItems() {
    const lastIndex = (this.slideItems.length - 1),
    prevIndex = (this.state.index == 0) ? lastIndex : this.state.index - 1,
    nextIndex = (this.state.index == lastIndex) ? 0 : this.state.index + 1;

    return [
      this.slideItems.at(prevIndex),
      this.slideItems.at(this.state.index),
      this.slideItems.at(nextIndex)
    ];
  }

  setWrapper() {
    this.slideWrapper.innerHTML = null;

    this.getItems().forEach((el) => {
      this.slideWrapper.appendChild(el);
    });

    this.slideWrapper.querySelectorAll('.slide-item').forEach((el, i, arr) => {
      el.style.transition = `unset`;
      el.style.transform = `translateX(-100%)`;
    });

    this.pagination();

    this.isSlide = false;
  }

  slide(target, p, newValue, receiver) {
    const oldValue = target[p],
    lastIndex = (this.slideItems.length - 1);

    let translateX = (newValue > oldValue) ? -200 : 0;

    //첫번째 슬라이드에서 마지막 슬라이드로 넘어오기
    if ((oldValue == 0) && (newValue == lastIndex)) {
      translateX = 0;
    }

    //마지막 슬라이드에서 첫번째 슬라이드로 넘어오기
    if ((newValue == 0) && (oldValue == lastIndex)) {
      translateX = -200;
    }

    this.slideWrapper.querySelectorAll('.slide-item').forEach((el, i, arr) => {
      el.style.transition = `transform ${this.slideTime / 1000}s ease-in-out`;
      el.style.transform = `translateX(${translateX}%)`;

      setTimeout(() => {
        this.setWrapper();
      }, this.slideTime);
    });

    this.isSlide = true;
  }

  pagination() {
    let paginItems = this.root.querySelectorAll('.pagination');

    paginItems.forEach((item, index) => {
      if (index == this.state.index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  onNextMouseDown() {
    clearInterval(this.interval);

    let index = this.state.index + 1;

    this.state.index = index % this.slideItems.length;
  }

  onNextMouseUp() {
    this.interval = this.slideInterval();
  }

  onPrevMouseDown() {
    clearInterval(this.interval);

    let index = this.state.index - 1;

    if (index < 0) {
      index = this.slideItems.length - 1;
    }

    this.state.index = index % this.slideItems.length;
  }

  onPrevMouseUp() {
    this.interval = this.slideInterval();
  }

  onPaginationClick(ev) {
    const node = ev.currentTarget,
    index = parseInt(node.dataset.index);

    if (index != this.state.index) {// 현재 슬라이드에서는 작동 x
      //슬라이드 중지
      clearInterval(this.interval);

      //선택한 이미지의 슬라이드로 이동하기 위해 state.index 설정
      this.isPagination = true;
      this.state.index = index;
      this.isPagination = false;

      //애니메이션 효과x
      this.setWrapper();

      //슬라이드 재가동
      this.interval = this.slideInterval();
    }
  }

  async init() {
    this.interval = this.slideInterval();

    this.root.querySelectorAll('.slide-next').forEach((el, i, arr) => {
      el.addEventListener('mousedown', this.onNextMouseDown);
      el.addEventListener('mouseup', this.onNextMouseUp);
    });

    this.root.querySelectorAll('.slide-prev').forEach((el, i, arr) => {
      el.addEventListener('mousedown', this.onPrevMouseDown);
      el.addEventListener('mouseup', this.onPrevMouseUp);
    });

    this.root.querySelectorAll('.pagination').forEach((el, i, arr) => {
      el.addEventListener('click', this.onPaginationClick);
    });
  }

  destroy() {
    clearInterval(this.interval);

    this.root.querySelectorAll('.slide-next').forEach((el, i, arr) => {
      el.removeEventListener('mousedown', this.onNextMouseDown);
      el.removeEventListener('mouseup', this.onNextMouseUp);
    });

    this.root.querySelectorAll('.slide-prev').forEach((el, i, arr) => {
      el.removeEventListener('mousedown', this.onPrevMouseDown);
      el.removeEventListener('mouseup', this.onPrevMouseUp);
    });

    this.root.querySelectorAll('.pagination').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onPaginationClick);
    });
  }
}