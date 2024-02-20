import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class CardPay extends PBElement {
  constructor() {
    super();

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onConfirmClick = this.onConfirmClick.bind(this);

    this.classList.add('modal-body');
    this.style.setProperty('--height', '300px');
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
    const root = document.querySelector(`div[is="${this.dataset.root}"]`),
    file = this.querySelector('[name="file"]'),
    detail = { ...this.arg.get() };

    detail.data.file = file.files;

    this.arg.set({
      ...this.arg.get(),
      type: null,
      index: null,
      data: null
    });

    root.dispatchEvent(new CustomEvent('file-upload-confirm', { detail: detail }));
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
    let html = `
      <div class="spacer" style="--height: 17px;"></div>
      <div class="account body-sm">
        <div class="divider" style="--color: var(--color-2);"></div>
        <div class="spacer" style="--height: 25px;"></div>
        <div class="row" style="--gap: 20px;">
          <div>은행로고</div>
          <div>국민</div>
          <div>123-1234-123456978</div>
        </div>
        <div class="spacer" style="--height: 17px;"></div>
        <div class="row" style="--gap: 20px;">
          <div>은행로고</div>
          <div>국민</div>
          <div>123-1234-123456978</div>
        </div>
        <div class="spacer" style="--height: 17px;"></div>
        <div class="row" style="--gap: 20px;">
          <div>은행로고</div>
          <div>국민</div>
          <div>123-1234-123456978</div>
        </div>
        <div class="spacer" style="--height: 30px;"></div>
        <div class="row" style="--gap: 40px;">
          <div>예금주</div>
          <div>(주)프린트뱅크</div>
        </div>
        <div class="spacer" style="--height: 17px;"></div>
        <div class="divider" style="--color: var(--color-2);"></div>
      </div>
      <div class="spacer" style="--height: 25px;"></div>
      <div>
        <div class="row body-md" style="--justify-content: center;">
          <button class="btn btn-lg round-md outline-red" data-action="close">닫기</button>
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}