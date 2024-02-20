import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Modal extends PBElement {
  constructor() {
    super();

    this.x = 0;
    this.y = 0;
    this.transX = 0;
    this.transY = 0;
    this.isMove = false;

    this.onTitleMouseDown = this.onTitleMouseDown.bind(this);
    this.onTitleMouseUp = this.onTitleMouseUp.bind(this);
    this.onAreaMouseDown = this.onAreaMouseDown.bind(this);
    this.onAreaMouseUp = this.onAreaMouseUp.bind(this);
    this.onAreaMouseMove = this.onAreaMouseMove.bind(this);
  }

  async init() {
    if (!Utils.empty(this.arg)) {
      this.arg = this.setState(this.arg);
    }
  }

  onTitleMouseDown(ev) {
    this.isMove = true;
  }

  onTitleMouseUp(ev) {
    this.isMove = false;
  }

  onAreaMouseDown(ev) {
    if (this.isMove) {
      this.x = ev.x - this.transX;
      this.y = ev.y - this.transY;
    }
  }

  onAreaMouseUp(ev) {
    if (this.isMove) {
      this.x = 0;
      this.y = 0;
    }
  }

  onAreaMouseMove(ev) {
    if (this.isMove) {
      const modal = this.querySelector('[data-action="area"] > .modal');

      this.transX = ev.x - this.x;
      this.transY = ev.y - this.y;

      modal.style.transform = `translate(${this.transX}px, ${this.transY}px)`;
    }
  }

  eventInit() {
    this.querySelectorAll('[data-action="title"]').forEach((el, i, arr) => {
      el.addEventListener('mousedown', this.onTitleMouseDown);
      el.addEventListener('mouseup', this.onTitleMouseUp);
    });

    this.querySelectorAll('[data-action="area"]').forEach((el, i, arr) => {
      el.addEventListener('mousedown', this.onAreaMouseDown);
      el.addEventListener('mouseup', this.onAreaMouseUp);
      el.addEventListener('mousemove', this.onAreaMouseMove);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="title"]').forEach((el, i, arr) => {
      el.removeEventListener('mousedown', this.onTitleMouseDown);
      el.removeEventListener('mouseup', this.onTitleMouseUp);
    });

    this.querySelectorAll('[data-action="area"]').forEach((el, i, arr) => {
      el.removeEventListener('mousedown', this.onAreaMouseDown);
      el.removeEventListener('mouseup', this.onAreaMouseUp);
      el.removeEventListener('mousemove', this.onAreaMouseMove);
    });
  }

  async render() {
    const title = this.getAttribute('data-title') ?? "";

    let html = ``;

    if (!Utils.empty(this.arg?.get('type'))) {
      const modal = this.arg?.get(this.arg?.get('type'));

      html += `
        <div class="modal-area" data-action="area">
          <div class="modal">
            <div class="modal-title title-lg" data-action="title">
              ${title}
            </div>
            <div is="${modal?.el}" data-root="${this.dataset.root}" data-arg="${modal?.arg}">
            </div>
          </div>
        </div>
      `;

      this.classList.add('active');
    } else {
      this.classList.remove('active');
    }

    this.innerHTML = html;

    const modal = this.querySelector('[data-action="area"] > .modal');

    if (!Utils.empty(modal)) {
      modal.style.transform = `translate(${this.transX}px, ${this.transY}px)`;
    }
  }
}