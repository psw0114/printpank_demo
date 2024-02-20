import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Review extends PBElement {
  constructor() {
    super();

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onConfirmClick = this.onConfirmClick.bind(this);
    this.onFillstarClick = this.onFillstarClick.bind(this);

    this.classList.add('modal-body');
    this.style.setProperty('--height', '650px');
    this.setAttribute('id', 'modal-content');
  }

  argInit() {
    this.arg = document.querySelector(`div[is="${this.dataset.root}"] div[is="pb-modal"]`)?.arg;
  }

  onCloseClick(ev) {
    this.arg.set({
      ...this.arg.get(),
      type: null,
      data: null
    });
  }

  onConfirmClick(ev) {
    const root = document.querySelector(`div[is="${this.dataset.root}"]`),
    inputs = document.querySelectorAll('.modal-display input'),
    texts = document.querySelector('.modal-display textarea'),
    detail = { ...this.arg.get('data') };

    this.arg.set({
      ...this.arg.get(),
      type: null,
      index: null,
      data: {
        ...this.arg.get('data'),
        text: texts.value,
        name: inputs[0].value,
        title: inputs[1].value,
        date: Utils.strftime(new Date(), '%Y-%m-%d')
      }
    });

    root.dispatchEvent(new CustomEvent('review-write-confirm', { detail: this.arg.get('data') }));
  }

  onFillstarClick(ev) {
    const node = ev.currentTarget.dataset.index,
    inputs = document.querySelectorAll('.modal-display input'),
    texts = document.querySelector('.modal-display textarea');

    this.arg.set(
      'data',
      {
        ...this.arg.get('data'),
        star: parseInt(node),
        text: texts.value,
        name: inputs[0].value,
        title: inputs[1].value
      }
    );
  }

  eventInit() {
    this.querySelectorAll('[data-action="close"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onCloseClick);
    });

    this.querySelectorAll('[data-action="confirm"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onConfirmClick);
    });

    this.querySelectorAll('[data-action="fill-star"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onFillstarClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="close"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onCloseClick);
    });

    this.querySelectorAll('[data-action="confirm"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onConfirmClick);
    });

    this.querySelectorAll('[data-action="fill-star"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onFillstarClick);
    });
  }

  async render() {
    const data = this.arg.get('data');

    let html = `
      <div class="spacer" style="--height: 17px;"></div>
      <div class="modal-display">
        <input type="hidden" value="프린트뱅크">
        <input class="input-lg search" type="text" placeholder="제목" style="--width : 100%" value="${data.title}">
        <div class="spacer" style="--height: 17px;"></div>
        <textarea class="text-area display-md" name="memo" data-action="memo" placeholder="내용">${data.text}</textarea>
        <div class="spacer" style="--height: 17px;"></div>
        <input type="file" src="../images/icon_1.png">
        <div class="spacer" style="--height: 17px;"></div>
        <div class="row" style="--gap:5px;">
    `;

    for (let i = 0; i < 5; i++) {
      html += `<div class="icon-star cursor ${((i + 1) <= data.star) ? 'fill' : ''}" style="--cursor:pointer" data-action="fill-star" data-index="${i + 1}"></div>`;
    }

    html +=`
        </div>
      </div>
      <div class="spacer" style="--height: 25px;"></div>
      <div class="btn-area">
        <div class="row body-md" style="--justify-content: center;">
          <button class="btn btn-lg round-md fill-blue" data-action="confirm">작성</button>
          <button class="btn btn-lg round-md outline-red" data-action="close">닫기</button>
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}