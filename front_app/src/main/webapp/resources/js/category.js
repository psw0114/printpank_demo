import Component from './component/category/index.js';
import PBElement from './utils/pb_element.js';
import Utils from './utils/utils.js';
import { product } from './data/category.js';
import { news, subBanner } from './data/utils.js';

class Category extends PBElement {
  newsArg = news;

  subBannerArg = subBanner;

  // productArg = product;

  constructor() {
    super();

    new Component();
  }

  async init() {
    await this.getCategoryProduct();
  }

  async getCategoryProduct() {
    const url = new URL('/category/product', location.origin),
    option = {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' }
    };

    await fetch(url, option)
      .then((response) => response.json())
      .then((json) => {
        this.productArg = json;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async render() {

    let  html = `
    	<div class="spacer" style="--height: 20px;"></div>
    	<div is="pb-sub-banner" data-root="pb-category" data-arg="subBannerArg"></div>

    	<div class="spacer" style="--height: 40px;"></div>
    	<div is="pb-title" data-title="명함" data-size="sm" data-divider="true"></div>
    	
    	<div class="spacer" style="--height: 40px;"></div>
    	<div is="pb-category-product" data-root="pb-category" data-arg="productArg"></div>
    	
    	<div class="spacer" style="--height: 80px;"></div>
    	<div is="pb-news" data-root="pb-category" data-arg="newsArg"></div>
    	    	
    	<div class="spacer" style="--height: 100px;"></div>
    	`;

    this.innerHTML = html;
  }
}

customElements.define('pb-category', Category, { extends: 'div' });