import Component from './component/event/index.js';
import PBElement from './utils/pb_element.js';
import Utils from './utils/utils.js';
import { recommend, subBanner } from './data/utils.js';

class Event extends PBElement {
  recommendArg = recommend;

  subBannerArg = subBanner;

  constructor() {
    super();

    new Component();
  }

  async render() {
    let html = `
      <div class="spacer" style="--height: 100px;"></div>
      <div is="pb-title" data-title="EVENT" data-desc="이벤트 참여하시고 상품 받아가세요!" data-size="lg"></div>

      <div class="spacer" style="--height: 80px;"></div>
      <div is="pb-event-product"></div>

      <div class="spacer" style="--height: 120px;"></div>
      <div is="pb-recommend" data-root="pb-event" data-arg="recommendArg"></div>

      <div class="spacer" style="--height: 100px;"></div>
      <div is="pb-sub-banner" data-root="pb-event" data-arg="subBannerArg"></div>

      <div class="spacer" style="--height: 100px;"></div>
    `;

    this.innerHTML = html;
  }
}

customElements.define('pb-event', Event, { extends: 'div' });