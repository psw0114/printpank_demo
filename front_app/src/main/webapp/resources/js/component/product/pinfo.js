import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Pinfo extends PBElement {
  constructor() {
    super();
  }

  async init() {
    this.arg = this.setState(this.arg);
  }

  async render() {
    const arg = this.arg.get();

    let html = `
      <div class="pinfo container">
        <img src="${arg.src}">
      </div>
    `;

    this.innerHTML = html;
  }
}