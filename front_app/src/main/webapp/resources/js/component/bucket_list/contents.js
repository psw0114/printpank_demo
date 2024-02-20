import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Content extends PBElement {
  constructor() {
    super();

    this.onPbPopState = this.onPbPopState.bind(this);
  }

  async init() {
    this.arg = this.setState(this.arg);
  }

  onPbPopState(ev) {
    const step = this.getParams().get('step') ?? 1;

    this.arg.set('step', parseInt(step));
  }

  eventInit() {
    window.addEventListener('pb-pop-state', this.onPbPopState);

    this._eventInit();
  }

  destroy() {
    window.removeEventListener('pb-pop-state', this.onPbPopState);

    this._destroy();
  }

  async render() {
    const arg = this.arg.get();

    let html = `<div class="spacer" style="--height: 100px;"></div>`;

    switch(arg.step) {
      case 1:
        html += `
          <div is="pb-title" data-title="장바구니" data-divider="true"></div>
          <div class="spacer" style="--height: 40px;"></div>
          <div is="pb-bucketlist-bucket" data-root="pb-bucketlist-content" data-arg="arg"></div>
        `;
        break;
      case 2:
        html += `
          <div is="pb-title" data-title="주문/결제" data-desc="미수금이 있는 경우 기존 미수금부터 결제 됩니다." data-color="red" data-divider="true"></div>
          <div class="spacer" style="--height: 40px;"></div>
          <div is="pb-bucketlist-payment" data-root="pb-bucketlist-content" data-arg="arg"></div>
        `;
        break;
    }

    this.innerHTML = html;
  }
}