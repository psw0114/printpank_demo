import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Term extends PBElement {
  constructor() {
    super();

    this.onCheckClick = this.onCheckClick.bind(this);
  }

  onCheckClick(ev) {
    const node = ev.currentTarget;

    this.arg.set(
      'terms',
      this.arg.get('terms').map((el, i, arr) => {
        return {
          ...el,
          checked: (i == node.dataset.index)
            ? node.checked
            : el.checked
        };
      })
    );
  }

  eventInit() {
    this.querySelectorAll('[data-action="check"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onCheckClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="check"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onCheckClick);
    });
  }

  async render() {
    const arg = this.arg.get();

    let html = `<div class="container">`;

    arg.terms.forEach((el, i, arr) => {
      html += `
        <div>
          <div class="heading-sm blue" style="font-weight: bold;">
            ${el.title}
          </div>

          <div class="spacer" style="--height: 10px;"></div>
          <div class="card display-md" style="--font-size: 1.5rem;">
            <div class="term">
              ${el.text}
            </div>
          </div>

          <div class="spacer" style="--height: 12px;"></div>
          <div class="input-group">
            <input type="checkbox" name="check-sign" id="check${i}" data-action="check" data-index="${i}" ${el.checked ? 'checked' : ''} autocomplete="off" />
            <label for="check${i}">${el.title}에 동의합니다.</label>
          </div>
        </div>
      `;

      if (i < (arr.length - 1)) {
        html += `<div class="spacer" style="--height: 50px;"></div>`;
      }
    });

    this.innerHTML = html;
  }
}