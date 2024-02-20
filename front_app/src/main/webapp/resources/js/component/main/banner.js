import PBElement from '../../utils/pb_element.js';
import Slide from '../utils/slide.js';

export default class Banner extends PBElement {
  constructor() {
    super();

    this.onBannerClick = this.onBannerClick.bind(this);
  }

  async init() {
    this.arg = this.setState(this.arg);
  }

  onBannerClick(ev) {
    const node = ev.currentTarget;
  }

  eventInit() {
    this.querySelectorAll('[data-action="banner"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onBannerClick);
    });

    this.slide = new Slide(
      'div[is="pb-main-banner"]',
      { interval: 2000 }
    );
  }

  destroy() {
    this.querySelectorAll('[data-action="banner"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onBannerClick);
    });

    this.slide.destroy();
  }

  async render() {
    // const arg = this.bannerArg.get();

    const arg = this.arg.get();


    let html = `<div class="banner swiper-wrapper">`;

    arg.forEach((el, i, arr) => {
      html += `
        <div class="slide-item title-lg" data-action="banner" data-href="${el.href}">
          <img src="${el.src}" alt="${el.alt}" />
        </div>
      `;
    });

    html += `
      </div>
      <div class="slide-button slide-prev icon-left"></div>
      <div class="slide-button slide-next icon-right"></div>
      <div class="slide-pagination">
        <div class="pagin-box">
    `;

    arg.forEach((el, i, arr) => {
      html += `
        <div class="pagination" data-index="${i}">
          <img src="${el.src}" alt="${el.alt}">
        </div>
      `;
    });

    html += `</div>`;

    this.innerHTML = html;
  }
}