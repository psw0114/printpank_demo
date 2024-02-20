import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class SubBanner extends PBElement {
  constructor() {
    super();

    this.onBannerClick = this.onBannerClick.bind(this);
  }

  async init() {
    this.arg = this.setState(this.arg);
    // await this.subBannerFetch();
  }

  // async subBannerFetch() {
  //   const url = new URL('/utils/subBanner', location.origin),
  //   option = {
  //     method: 'GET',
  //     mode: 'cors',
  //     headers: { Accept: 'application/json' }
  //   };

  //   await fetch(url, option)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       this.subBanner = this.setState(json);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  onBannerClick(ev) {
    location.href = this.subBanner.get('href');
  }

  eventInit() {
    this.querySelectorAll('[data-action="banner"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onBannerClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="banner"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onBannerClick);
    });
  }

  async render() {
    const arg = this.arg.get();
        
    let html = `
      <div class="container">
        <div class="banner col cursor" style="--cursor: pointer;" data-action="banner">
          <img src="${arg.src}" alt="${arg.alt}">
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}