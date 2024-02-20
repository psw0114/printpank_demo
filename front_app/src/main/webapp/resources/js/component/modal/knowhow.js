import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Knowhow extends PBElement {
  constructor() {
    super();

    this.onCloseClick = this.onCloseClick.bind(this);

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
      index: null
    });
  }

  eventInit() {
    this.querySelectorAll('[data-action="close"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onCloseClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="close"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onCloseClick);
    });
  }

  async render() {
    const data = this.arg.get('data');

    let html = `
      <div class="modal-display">
        <div class="spacer" style="--height: 17px;"></div>
        <div class="upload">
          <div class="file-upload">
            <img src="${data.knowhow_src}">
          </div>
        </div>
      </div>

      <div class="spacer" style="--height: 25px;"></div>
      <div class="btn-area">
        <div class="row body-md" style="--justify-content: center;">
          <button class="btn btn-lg round-md outline-red" data-action="close">닫기</button>
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}