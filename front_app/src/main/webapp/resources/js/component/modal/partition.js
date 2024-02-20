import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Partition extends PBElement {
  constructor() {
    super();

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onConfirmClick = this.onConfirmClick.bind(this);
    this.onDivideClick = this.onDivideClick.bind(this);
    this.onDelClick = this.onDelClick.bind(this);

    this.classList.add('modal-body');
    this.style.setProperty('--height', '650px');
    this.setAttribute('id', 'modal-content');
  }

  argInit() {
    this.arg = document.querySelector(`div[is="${this.dataset.root}"] div[is="pb-modal"]`)?.arg;
  }

  async init() {
    const data = this.arg.get('data');

    this.divide = this.setState(
      data.quantity.filter((el, i, arr) => i > 0)
    );
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
    const root = document.querySelector(`div[is="${this.dataset.root}"]`),
    arg = this.arg.get(),
    divide = this.divide.get(),
    rest = arg.data.quantity.reduce((acc, cur, i, arr) => acc + cur.quantity, 0) - divide.reduce((acc, cur, i, arr) => acc + cur.quantity, 0),
    detail = {
      ...arg,
      data: {
        ...arg.data,
        quantity: (rest > 0)
          ? [
              {
                quantity: rest,
                parcel: arg.data.quantity[0].parcel,
                checked: arg.data.quantity[0].checked
              },
              ...divide
          ]
          : divide
      }
    };

    root.dispatchEvent(new CustomEvent('partition-confirm', { detail: detail }));
  }

  onDivideClick(ev) {
    const quantity = this.querySelector('[data-name="quantity"]'),
    clone = [ ...this.divide.get() ],
    arg = this.arg.get();

    clone.push({
      quantity: parseInt(quantity.value),
      parcel: arg.data.quantity[0].parcel,
      checked: arg.data.quantity[0].checked
    });

    this.divide.set(clone);
  }

  onDelClick(ev) {
    const node = ev.currentTarget,
    clone = [ ...this.divide.get() ];

    clone.splice(node.dataset.index, 1);

    this.divide.set(clone);
  }

  eventInit() {
    this.querySelectorAll('[data-action="close"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onCloseClick);
    });

    this.querySelectorAll('[data-action="confirm"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onConfirmClick);
    });

    this.querySelectorAll('[data-action="divide"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onDivideClick);
    });

    this.querySelectorAll('[data-action="del"]').forEach((el, i, arr) => {
      el.addEventListener("click",this.onDelClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="close"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onCloseClick);
    });

    this.querySelectorAll('[data-action="confirm"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onConfirmClick);
    });

    this.querySelectorAll('[data-action="divide"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onDivideClick);
    });

    this.querySelectorAll('[data-action="del"]').forEach((el, i, arr) => {
      el.removeEventListener("click",this.onDelClick);
    });
  }

  async render() {
    const arg = this.arg.get(),
    divide = this.divide.get(),
    rest = arg.data.quantity.reduce((acc, cur, i, arr) => acc + cur.quantity, 0) - divide.reduce((acc, cur, i, arr) => acc + cur.quantity, 0);

    let html = `
      <div class="spacer" style="--height: 17px;"></div>
      <div class="modal-display">
        <div class="rest-amount row" style="--justify-content:space-between; --align-items:end">
          <div class="heading-md">상품명 : ${arg.data.pdname}</div>
          <div class="display-sm">남은매수 : ${Utils.numberFormat(rest)} / ${Utils.numberFormat(arg.data.quantity.reduce((acc, cur, i, arr) => acc + cur.quantity, 0))}</div>
        </div>
        <div class="spacer" style="--height: 10px;"></div>
        <div class="row" style="--align-items:center">
          <select class="input-sm" data-name="quantity" ${(rest == 0) ? 'disabled' : ''}>
    `;

    for (let i = 1; i <= rest / arg.data.min_count; i++) {
      html += `<option class="count" value=${arg.data.min_count * i}>${arg.data.min_count * i}</option>`;
    }

    html += `
        </select>
        <button class="btn btn-md round-sm outline-blue" ${(rest == 0) ? 'disabled' : ''} data-action="divide">선택</button>
      </div>
      <div class="spacer" style="--height: 25px;"></div>
      <div class="new-items">
    `;

    divide.forEach((el, i, arr) => {
      html += `
        <div class="new-item row">
          <div class="item-amount">수량 : ${el.quantity}</div>
          <button class="btn btn-sm outline-red" data-action="del" data-index="${i}">삭제</button>
        </div>
        <div class="spacer" style="--height: 10px;"></div>
      `;
    });

    html += `
        </div>
      </div>
      <div class="spacer" style="--height: 25px;"></div>
      <div class="btn-area">
        <div class="row body-md" style="--justify-content: center;">
          <button class="btn btn-lg round-md fill-blue" data-action="confirm">저장</button>
          <button class="btn btn-lg round-md outline-red" data-action="close">닫기</button>
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}