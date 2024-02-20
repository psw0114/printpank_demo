import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class WorkMemo extends PBElement {
  constructor() {
    super();

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onConfirmClick = this.onConfirmClick.bind(this);

    this.classList.add('modal-body');
    this.style.setProperty('--height', '300px');
    this.setAttribute('id', 'modal-content');
  }

  argInit() {
    this.arg = document.querySelector(`div[is="${this.dataset.root}"] div[is="pb-modal"]`)?.arg
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
    memo = this.querySelector('[name="memo"]'),
    detail = { ...this.arg.get() };

    detail.data.memo = memo.value;

    this.arg.set({
      ...this.arg.get(),
      type: null,
      index: null,
      data: null
    });

    root.dispatchEvent(new CustomEvent('work-memo-confirm', { detail: detail }));
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
      <div class="work-memo">
        <div class="memo">
          <div class="display-lg">요청사항 메모</div>
          <div class="spacer" style="--height: 10px;"></div>
          <textarea class="text-area display-md" name="memo" placeholder="납품일 관련 요청사항이나 인쇄시 주의사항이 있는 경우 필히 메모를 남겨주세요.">${data.memo}</textarea>
        </div>
      </div>
      <div class="spacer" style="--height: 25px;"></div>
      <div>
        <div class="row body-md" style="--justify-content: center;">
          <button class="btn btn-lg round-md fill-blue" data-action="confirm">변경</button>
          <button class="btn btn-lg round-md outline-red" data-action="close">닫기</button>
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}