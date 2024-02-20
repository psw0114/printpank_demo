import Component from './component/customer/index.js';
import PBElement from './utils/pb_element.js';
import Utils from './utils/utils.js';
// import { recommend, news } from './data/utils.js';

class Customer extends PBElement {
  // recommendArg = recommend;

  // newsArg = news;

  constructor() {
    super();

    new Component();
  }

  async init() {
    // await this.getCustomerRecommend();
  }

  // async getCustomerRecommend() {
  //   const url = new URL('/common.util', location.origin),
  //   option = {
  //       method: 'GET',
  //       mode: 'cors',
  //       headers: { Accept: 'application/json' }
  //   };

  //   await fetch(url, option)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       this.recommendArg = json;
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  async render() {
    let html = `
      <div class="spacer" style="--height: 100px;"></div>
      <div is="pb-customer-main" id="customer"></div>

      <div class="spacer" style="--height: 80px;"></div>
      <!-- <div is="pb-recommend" data-root="pb-customer" data-arg="recommendArg"></div> -->
      <div is="pb-recommend" data-root="pb-customer"></div>

      <div class="spacer" style="--height: 80px;"></div>
      <!-- <div is="pb-news" data-root="pb-customer" data-arg="newsArg"></div> -->
      <div is="pb-news" data-root="pb-customer"></div>

      <div class="spacer" style="--height: 100px;"></div>
    `;

    this.innerHTML = html;
  }
}

customElements.define('pb-customer', Customer, { extends: 'div' });