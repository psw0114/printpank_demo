import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Product extends PBElement {
  constructor() {
    super();

    this.onProductClick = this.onProductClick.bind(this);
  }

  async init() {
    this.arg = this.setState(this.arg);
  }

  onProductClick(ev) {
    const node = ev.currentTarget,
    item = this.arg.get('item');

    location.href = `${item[node.dataset.index].href}?index=${node.dataset.index}`;
  }

  eventInit() {
    this.querySelectorAll('[data-action="product"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onProductClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="product"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onProductClick);
    });
  }

  async render() {
    const item = this.arg.get('item');
 
    let html = `
      <div class="container">
        <div class="row" style="--justify-content: space-between;">
    `;

    item.forEach((el, i, arr) => {
      html += `
        <div class="product cursor" data-action="product" data-index="${i}" style="--product-width: 323px; --cursor: pointer;">
          <div class="img">
            <img src="${el.src}" alt="${el.alt}">
          </div>
          <div class="content">
            <div class="title">${el.prName}</div>
            <div class="text">${el.prDesc}</div>
            <div class="price">
              <div class="blue">${el.amount}매</div>
              <div>${el.price}~</div>
            </div>
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