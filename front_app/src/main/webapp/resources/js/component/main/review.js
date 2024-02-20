import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Review extends PBElement {
  constructor() {
    super();

    this.onReviewClick = this.onReviewClick.bind(this);
  }

  async init() {
    this.arg = this.setState(this.arg);
  }

  onReviewClick(ev) {
    const node = ev.currentTarget,
    item = this.reviewArg.get('item');

    location.href = `${item[node.dataset.index].href}?index=${node.dataset.index}`;
  }

  eventInit() {
    this.querySelectorAll('[data-action="review"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onReviewClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="review"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onReviewClick);
    });
  }

  async render() {
    // const arg = this.reviewArg.get();
    const arg = this.arg.get();


    let html = `
      <div class="container">
        <div class="row" style="--align-items: center; --justify-content: space-between;">
    `;

    arg.forEach((el, i, arr) => {
      html += `
        <div class="review-wrap cursor" data-action="review" data-index="${i}" style="--cursor: pointer;">
          <div class="card" style="--width: 390px;">
            <div class="body img">
              <img src="${el.src}" alt="${el.alt}">
            </div>
            <div class="footer">
              <div class="heading-sm">${el.prName}</div>
              <div class="display-md">${el.prDesc}</div>
              <div class="row display-md" style="--font-weight: 600; --gap: 10px;">
                <div class="blue">${el.amount}매</div>
                <div>${el.price}~</div>
              </div>
            </div>
          </div>
          <div class="review">
            <div class="review-star">
              <img class="img-box ss" src="${el.src}" alt="${el.alt}">
              <div class="content">
                <div class="title">${el.prName}</div>
                <div class="text">${el.reviewText}</div>
                <div class="bottom">
                  <div class="star row" style="--gap: 1px;">
      `;

      for (let i = 0; i < 5; i++) {
        html += `<div class="icon-star ${((i + 1) <= el.star) ? 'fill' : ''}"></div>`;
      }

      html += `
                  </div>
                  <div class="name">${el.userName}</div>
                </div>
              </div>
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