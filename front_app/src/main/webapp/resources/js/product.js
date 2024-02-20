import Component from './component/product/index.js';
import PBElement from './utils/pb_element.js';
import Utils from './utils/utils.js';
import { bucket } from './data/bucket_list.js'
import { Tab } from './data/product.js';

class Product extends PBElement {
  bucketArg = bucket;

  tabArg = Tab;

  constructor() {
    super();

    new Component();
  }

  async render() {
    let html = `
      <div class="spacer" style="--height: 100px;"></div>
      <div is="pb-product-desc" data-root="pb-product"></div>

      <div class="spacer" style="--height: 100px;"></div>
      <div is="pb-product-detail" data-root="pb-product"></div>

      <div class="spacer" style="--height: 100px;"></div>
      <div is='pb-product-info-content' data-root='pb-product' data-arg="tabArg"></div>

      <div class="spacer" style="--height: 120px;"></div>
      <div is="pb-news" data-root="pb-product" data-arg="newsArg"></div>

      <div class="spacer" style="--height: 100px;"></div>
      <div is="pb-sub-banner" data-root="pb-product" data-arg="subBannerArg"></div>

      <div class="spacer" style="--height: 100px;"></div>
      <div is="pb-product-receipt" data-root="pb-product" data-arg="bucketArg"></div>
    `;

    this.innerHTML = html;
  }
}

customElements.define('pb-product', Product, { extends: 'div' });