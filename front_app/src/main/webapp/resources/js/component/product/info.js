import { Tab } from '../../data/product.js';
import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Info extends PBElement {
  constructor() {
    super();

    this.onBarClick = this.onBarClick.bind(this);
    this.onWindowScroll = this.onWindowScroll.bind(this);
  }

  async init() {
    this.tabArg = this.setState(Tab);
    await this.infoFetch();
  }

  async infoFetch() {
    const url = new URL('/product/info', location.origin),
    option = {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' }
    };

    await fetch(url, option)
      .then((response) => response.json())
      .then((json) => {
        this.pinfo = json.image[0];
        this.pdelivery = json.image[1];
        this.pguide = json.image[2];
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onBarClick(ev) {
    const node = ev.currentTarget,
    location = this.querySelectorAll('.info-contents')[node.dataset.index];

    window.scrollTo({
      top: location.offsetTop - (innerHeight / 3),
      behavior: "smooth"
    });
  }

  onWindowScroll() {
    const contentY = [];

    this.querySelectorAll('.info-contents').forEach((el, i, arr) => {
      contentY.push(el.offsetTop - (window.innerHeight / 3) - 1);
    });

    if (window.scrollY >= contentY[3]) {
      this.querySelectorAll('[data-action="bar"]').forEach((el, i, arr) => {
        if (i == 3) {
          el.classList.add('fill-blue');
        } else{
          el.classList.remove('fill-blue');
        }
      });
    } else if (window.scrollY >= contentY[2]) {
      this.querySelectorAll('[data-action="bar"]').forEach((el, i, arr) => {
        if (i == 2) {
          el.classList.add('fill-blue');
        } else{
          el.classList.remove('fill-blue');
        }
      });
    } else if (window.scrollY >= contentY[1]) {
      this.querySelectorAll('[data-action="bar"]').forEach((el, i, arr) => {
        if (i == 1) {
          el.classList.add('fill-blue');
        } else{
          el.classList.remove('fill-blue');
        }
      });
    } else {
      this.querySelectorAll('[data-action="bar"]').forEach((el, i, arr) => {
        if (i == 0) {
          el.classList.add('fill-blue');
        } else{
          el.classList.remove('fill-blue');
        }
      });
    }
  }

  eventInit() {
    window.addEventListener('scroll', this.onWindowScroll);

    this.querySelectorAll('[data-action="bar"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onBarClick);
    });
  }

  destroy() {
    window.removeEventListener('scroll', this.onWindowScroll);

    this.querySelectorAll('[data-action="bar"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onBarClick);
    });
  }

  async render() {
    const arg = this.tabArg.get();

    let html = `
      <div class="bar">
        <div class="container cursor" style="--cursor: pointer;">
    `;

    arg.forEach((el, i ,arr) => {
      html += `
        <div class="block btn body-md ${(i == 0) ? 'fill-blue' : ''}" data-action="bar" data-index=${i}>
          ${el.title}
        </div>
      `;
    });

    html += `
        </div>
      </div>
      <div class="spacer" style="--height:20px"></div>
      <div class="infos">
        <div class="info-contents" is="pb-product-info" data-root='pb-product-info-content' data-arg="pinfo"></div>
        <div class="spacer" style="--height:30px"></div>
        <div class="info-contents" is="pb-product-guide" data-root='pb-product-info-content' data-arg="pguide"></div>
        <div class="spacer" style="--height:30px"></div>
        <div class="info-contents" is="pb-delivery-info" data-root='pb-product-info-content' data-arg="pdelivery"></div>
        <div class="spacer" style="--height:30px"></div>
        <div class="info-contents" is="pb-review" data-root='pb-product-info-content'></div>
      </div>
    `;

    this.innerHTML = html;
  }
}