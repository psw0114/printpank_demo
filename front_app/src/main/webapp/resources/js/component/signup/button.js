import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Button extends PBElement {
  constructor() {
    super();

    this.onSignupBtnClick = this.onSignupBtnClick.bind(this);
  }

  onSignupBtnClick(ev) {
    const node = ev.currentTarget;
  }

  eventInit() {
    this.querySelectorAll('[data-action="sign-up"]').forEach((el, i, arr) => {
      el.addEventListener('click',this.onSignupBtnClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="sign-up"]').forEach((el, i, arr) => {
      el.removeEventListener('click',this.onSignupBtnClick);
    });
  }

  async render() {
    const arg = this.arg.get(),
    isChecked = this.arg.get('terms').every((el) => el.checked);

    let html = `
      <div class="container">
        <div class="row" style="--gap: 40px;">
    `;

    arg.button.forEach((el, i, arr) => {
      html += `
        <div class="card col">
          <div class="body" style="--align-items: center; --gap: 170px;">
            <div class="item" style="--direction: column; --align-items: center;">
              <div class="heading-md" style="font-weight: bold;">
                ${el.title}
              </div>
              <div class="display-md" style="font-weight: 500; font-size: 1.5rem;">
                ${el.desc}
              </div>
            </div>
            <button class="btn btn-lg round-lg fill-blue body-lg" ${isChecked ? '' : 'disabled'} style="--padding-top: 10px; --padding-bottom: 10px; --font-weight: 500; --min-width: 100%;" data-action="sign-up" data-type="${el.type}">
              가입하기
            </button>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}