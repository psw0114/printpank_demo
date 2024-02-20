import { modal } from '../../data/product.js';
import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';


export default class Review extends PBElement {
  modalArg = modal;

  constructor() {
    super();

    this.onReviewTypeClick = this.onReviewTypeClick.bind(this);
    this.onRevieDetailClick = this.onRevieDetailClick.bind(this);
    this.onModalClick = this.onModalClick.bind(this);
    this.onConfirmClick = this.onConfirmClick.bind(this);
  }

  async init() {
    await this.reviewFetch();
  }

  async reviewFetch() {
    const url = new URL('/product/review', location.origin),
    option = {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' }
    };

    await fetch(url, option)
      .then((response) => response.json())
      .then((json) => {
        this.reviewArg = this.setState(json);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onReviewTypeClick(ev){
    const node = ev.currentTarget.dataset.type;

    this.reviewArg.set(
      'reviewShow',
      node
    );
  }

  onRevieDetailClick(ev){
    const node = ev.currentTarget;
    this.querySelectorAll('[data-action="review-detail"]').forEach((el, i, arr)=>{
      if(node == el){
        el.classList.toggle('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  onModalClick(ev){
    const node = ev.currentTarget,
    modal = this.querySelector('[is="pb-modal"]');

    modal.setAttribute('data-title', node.dataset.title);

    modal.arg.set({
      ...modal.arg.get(),
      type: node.dataset.type,
      data: {
        text: "",
        name: "",
        title: "",
        date: "",
        src: "",
        star:0
      }
    });
  }

  onConfirmClick(ev){
    const detail = ev.detail;
    this.reviewArg.set(
      'review',
      [
        detail,
        ...this.reviewArg.get('review')
      ]
    )
  }

  eventInit() {
    this.querySelectorAll('[data-action="review-type"]').forEach((el, i, arr)=>{
      el.addEventListener('click',this.onReviewTypeClick);
    });

    this.querySelectorAll('[data-action="review-detail"]').forEach((el, i, arr)=>{
      el.addEventListener('click',this.onRevieDetailClick);
    });

    this.querySelectorAll('[data-action="modal"]').forEach((el, i, arr)=>{
      el.addEventListener('click',this.onModalClick);
    });

    this.addEventListener('review-write-confirm',this.onConfirmClick);
  }

  destroy() {
    this.querySelectorAll('[data-action="review-type"]').forEach((el, i, arr)=>{
      el.removeEventListener('click',this.onReviewTypeClick);
    });

    this.querySelectorAll('[data-action="review-detail"]').forEach((el, i, arr)=>{
      el.removeEventListener('click',this.onRevieDetailClick);
    });

    this.querySelectorAll('[data-action="modal"]').forEach((el, i, arr)=>{
      el.removeEventListener('click',this.onModalClick);
    });

    this.removeEventListener('review-write-confirm',this.onConfirmClick);
  }

  async render() {
    const arg = this.reviewArg.get();
    let view;

    if (arg.reviewShow == 'photo') {
      view = arg.review.filter((el) => el.src != '');
    } else {
      view = arg.review;
    }

    let html = `  
    <div class="container">
      <div class="review">
        <div class="title-lg">고품격명함 상품 후기</div>
        <div class="body-sm">리뷰를 작성해주신 고객분들께 추첨을 통하여 사은품을 보내드립니다</div>
        <button class="btn btn-lg outline-blue body-sm" data-action="modal" data-title="리뷰작성" data-type="D">내 주문 건 후기 작성하기</button>
      </div>

      <div class="spacer" style="--height: 50px;"></div>
      <div class="row body-md" style="--font-weight: 600; --gap: 10px; --align-items: center;">
        <div class="${arg.reviewShow == 'all' ? 'blue' : ''} cursor" style="--cursor:pointer" data-action="review-type" data-type="all">전체</div>
        <div class="divider" style="--width: 1px; --height: 15px;"></div>
        <div class="${arg.reviewShow == 'photo' ? 'blue' : ''} cursor" style="--cursor:pointer" data-action="review-type" data-type="photo">포토리뷰</div>
      </div>
      <div class="spacer" style="--height: 7px;"></div>
      <div class="divider"></div>
      <div class="big">
    `;


    view.forEach((el, i, arr) => {
      html += `
        <div class="item cursor" style="--cursor:pointer" data-action="review-detail" data-index="${i}">
          <div class="row body-lg">
            <div class="star-box">
      `;

      for (let i = 0; i < 5; i++) {
        html += `<div class="icon-star ${((i + 1) <= el.star) ? 'fill' : ''}"></div>`;
      }

      html += `
          </div>
          <div class="text body-lg" style="--font-weight: normal;">${el.title}</div>
          <div class="name body-lg" style="--font-weight: normal;">${el.name}</div>
          <div class="date body-lg" style="--font-weight: normal;">${el.date}</div>
        </div>
        <div class="detail-review display-sm">
      `;

      if (!Utils.empty(el.src)) {
        html += `<div class="review-photo"><img src="${el.src}"></div>`;
      }

      html += `
            <div class="review-content">${el.text}</div>
          </div>
        </div>
      `;
    });

    html += `
            </div>
            <div class="spacer" style="--height: 50px;"></div>
            <div class="page-move">
              <div class="pagination">
                <div class="icon-left"></div>
                <div class="paging active">1</div>
                <div class="paging">2</div>
                <div class="paging">3</div>
                <div class="paging">4</div>
                <div class="paging">5</div>
                <div class="icon-right"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div is="pb-modal" data-root="pb-review" data-arg="modalArg"></div>
    `;

    this.innerHTML = html;
  }
}