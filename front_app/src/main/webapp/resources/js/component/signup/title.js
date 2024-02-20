import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Title extends PBElement {
  constructor() {
    super();
  }

  async render() {
    let html = `
      <div class="container">
        <div class="row" style="--justify-content: center;">
          <div class="title-md" style="--font-weight: bold;">
            회원가입
          </div>
        </div>

        <div class="spacer" style="--height: 22px;"></div>
        <div class="divider" style="--color: var(--color-2);"></div>
      </div>
    `;

    this.innerHTML = html;
  }
}