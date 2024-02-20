import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class AllAgree extends PBElement {
  constructor() {
    super();

    this.onCheckAllClick = this.onCheckAllClick.bind(this);
  }

  onCheckAllClick(ev) {
    this.arg.set(
      'terms',
      this.arg.get('terms').map((el, i, arr) => {
        return {
          ...el,
          checked: true
        };
      })
    )
  }

  eventInit() {
    this.querySelectorAll('[data-action="check-all"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onCheckAllClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="check-all"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onCheckAllClick);
    });
  }

  async render() {
    const arg = this.arg.get();

    let html = `
      <div class="container">
        <div>
          <div class="heading-md" style="--font-weight: 500;">
            회원약관, 이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
          </div>

          <div class="spacer" style="--height: 25px;"></div>
          <button class="btn btn-lg round-md fill-blue body-lg" style="--min-width: 100%; --font-weight: bold;" data-action="check-all" ${(arg.terms.every((el) => el.checked)) ? 'disabled' : ''}>
            모두동의
          </button>
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}