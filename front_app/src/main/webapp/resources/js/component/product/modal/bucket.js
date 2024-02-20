import PBElement from '../../../utils/pb_element.js';
import Utils from '../../../utils/utils.js';

export default class Bucket extends PBElement {
  constructor() {
    super();

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onConfirmClick = this.onConfirmClick.bind(this);

    this.classList.add('modal-body');
    this.style.setProperty('--height', '250px');
    this.setAttribute('id', 'modal-content');
  }

  argInit() {
    this.arg = document.querySelector(`div[is="${this.dataset.root}"] div[is="pb-modal"]`)?.arg;
  }

  onCloseClick(ev) {
    this.arg.set({
      ...this.arg.get(),
      type: null,
      index: null,
      data: null
    });
  }

  onConfirmClick(ev) {
    location.href ='bucket_list';
  }

  eventInit() {
    this.querySelectorAll('[data-action="close"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onCloseClick);
    });

    this.querySelectorAll('[data-action="confirm"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onConfirmClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="close"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onCloseClick);
    });

    this.querySelectorAll('[data-action="confirm"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onConfirmClick);
    });
  }

  async render() {
    const data = this.arg.get('data');

    let html = `
      <div class="spacer" style="--height: 17px;"></div>
      <div class="option-detail">
        <div class="table">
          <table style="--back-color: var(--back-3);">
            <tr>
              <td>품목</td>
              <td>제작물 상호</td>
              <td>종류</td>
              <td>수량(건)</td>
              <td>금액</td>
            </tr>
            <tr>
              <td>고품격명함</td>
              <td>${data.pdname}</td>
              <td>${data.optionlist}</td>
              <td>${Utils.numberFormat(data.quantity)}(${Utils.numberFormat(data.case)})</td>
              <td>${Utils.numberFormat(data.price)}</td>
            </tr>
          </table>
        </div>
        <div class="spacer" style="--height: 17px;"></div>
      </div>
      <div class="spacer" style="--height: 25px;"></div>
      <div>
        <div class="row body-md" style="--justify-content: center;">
          <button class="btn btn-lg round-md outline-blue" data-action="confirm">장바구니 이동</button>
          <button class="btn btn-lg round-md outline-red" data-action="close">구매 계속하기</button>
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}