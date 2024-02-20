import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Manager extends PBElement {
  constructor() {
    super();

    this.onCloseClick = this.onCloseClick.bind(this);

    this.setAttribute('id', 'modal-content');
    this.classList.add('modal-body');
    this.style.setProperty('--height', 'unset');
    this.style.setProperty('--width', '1300px');
    this.style.setProperty('max-width', '1300px');
  }

  onCloseClick(ev) {
    this.dispatchEvent(new CustomEvent('modal-close', { detail: ev }));
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
    let html = `
      <div class="manager"></div>
      <div>
        <div class="row body-md" style="--justify-content: center;">
          <button class="btn btn-lg round-md outline-red" data-action="close">닫기</button>
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}