import PBElement from '../../utils/pb_element.js';
import Slide from '../utils/slide.js';

export default class Product extends PBElement {
  constructor() {
    super();

    this.onBannerClick = this.onBannerClick.bind(this);
    this.onProductClick = this.onProductClick.bind(this);
    this.onPlusiconClick = this.onPlusiconClick.bind(this);
  }

  async init() {
    this.arg = this.setState(this.arg);
  }

  onBannerClick(ev) {
    const node = ev.currentTarget;
  }

  onPlusiconClick(ev) {
    const node = ev.currentTarget;
  }

  onProductClick(ev) {
    const node = ev.currentTarget;
  }

  eventInit() {
    this.querySelectorAll('[data-action="banner"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onBannerClick);
    });

    this.querySelectorAll('[data-action="product"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onProductClick);
    });

    this.querySelectorAll('[data-action="plus-icon"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onPlusiconClick);
    });

    this.slide = new Slide(
      'div[is="pb-main-product"]',
      { interval : 2000 }
    );
  }

  destroy() {
    this.querySelectorAll('[data-action="banner"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onBannerClick);
    });

    this.querySelectorAll('[data-action="product"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onProductClick);
    });

    this.querySelectorAll('[data-action="plus-icon"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onPlusiconClick);
    });

    this.slide.destroy();
  }

  async render() {
    // const arg = this.productArg.get();
    const arg = this.arg.get();
   console.log(arg); 
    let html = `
      <div class="container">
        <div class="row" style="--justify-content: space-between;">
          <div class="banner swiper col" data-href="${arg.subBanner[0].href}">
            <div class="swiper-wrapper">
    `;

    arg.subBanner.forEach((el, i, arr) => {
      html += `
        <div class= "slide-item btitle-lg" data-action ="banner" data-href="${el.href}">
          <img src="${el.src}" alt="${el.alt}"/>
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

    arg.subBanner.forEach((el, i, arr) => {
      html += `
        <div class="pagination" data-index="${i}">
          <img src="${el.src}" alt="${el.alt}">
        </div>
      `;
    });

    html += `
          </div>
        </div>
      </div>
    `;

    arg.product.forEach((el, i, arr) => {
      html += `
        <div class="card" style="--width: 290px;">
          <div class="row" style="--align-items: center; --justify-content: space-between;">
            <div class="heading-md blue">${el.title}</div>
            <button class="icon-plus" data-action="plus-icon" data-location=""></button>
          </div>
          <div class="spacer" style="--height: 7px;"></div>
          <div class="divider" style="--color: var(--color-2);"></div>
          <div class="spacer" style="--height: 17px;"></div>
          <div class="body">
      `;

      el.data.forEach((d_el, i, arr) => {
        html += `
          <div class="item cursor" data-action="product" data-href="${d_el.href}" style="--cursor: pointer;">
            <img src="${d_el.src}" alt="${d_el.alt}">
            <div class="desc">
              <div class="heading-sm">${d_el.title}</div>
              <div class="display-md">${d_el.text}</div>
              <div class="row display-md" style="--font-weight: 600; --gap: 10px;">
                <div class="blue">${d_el.amount}매</div>
                <div>${d_el.price}~</div>
              </div>
            </div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}