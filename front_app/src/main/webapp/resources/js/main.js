import Component from './component/main/index.js';
import PBElement from './utils/pb_element.js';

class Main extends PBElement {
  recommendArg = true;

  constructor() {
    super();

    new Component();
  }

  async init(){
    await this.mainFetch();
  }

  async mainFetch(){
    const url = new URL('/main/content',location.origin),
    option = {
      method: 'GET',
      mode:'cors',
      headers: {Accept: 'application/json'}
    };

    await fetch(url,option)
      .then((response) => response.json())
      .then((json) => {
        this.banner = json.banner,
        this.notice = json.notice,
        this.product = json.product;
        this.review = json.review;
        this.recommend = {
          ...json.recommend,
          side: true
        };
        this.news = json.news;
        this.subBanner = json.subBanner;
      })
      .catch((e) =>{
        console.log(e);
      });
  }

  
  async render() {   
    let html = `
    
      <div class="spacer" style="--height: 10px;"></div>
      <div is="pb-main-banner" data-root="pb-main" class="swiper" data-arg="banner"></div>

      <div class="spacer" style="--height: 80px;"></div>
      <div is="pb-main-notice" data-root="pb-main" data-arg="notice"></div>

      <div class="spacer" style="--height: 80px;"></div>
      <div is="pb-main-product" id="main-product" data-root="pb-main" data-arg="product"></div>

      <div class="spacer" style="--height: 80px;"></div>
      <div is="pb-news" data-root="pb-main" data-arg="news"></div>

      <div class="spacer" style="--height: 80px;"></div>
      <div is="pb-recommend" data-root="pb-main" data-arg="recommend"></div>

      <div class="spacer" style="--height: 80px;"></div>
      <div is="pb-main-review" data-root="pb-main" data-arg="review"></div>

      <div class="spacer" style="--height: 80px;"></div>
      <div is="pb-sub-banner" data-root="pb-main" data-arg="subBanner"></div>

      <div class="spacer" style="--height: 100px;"></div>
    `;

    this.innerHTML = html;
  }
}

customElements.define('pb-main', Main, { extends: 'div' });