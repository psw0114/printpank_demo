import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Title extends PBElement {
  constructor() {
    super();
  }

  async render() {
    let html = `
      <div class="container">
        <div class="row">
          <div class="title-${this.dataset.size ?? 'md'}">${this.dataset.title}</div>
    `;

    if (!Utils.empty(this.dataset.desc)) {
      html += `
        <div class="display-${this.dataset.size ?? 'md'} ${this.dataset.color ?? ''}">
          ${this.dataset.desc}
        </div>
      `;
    }

    html += `
        </div>

        <div class="spacer"></div>
        <div class="divider" style="--height: ${this.dataset.divider ? '1' : '0'}px;"></div>
      </div>
    `;

    this.innerHTML = html;
  }
}