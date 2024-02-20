import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class ProductDesc extends PBElement {
  constructor() {
    super();

    this.onProductImgClick = this.onProductImgClick.bind(this);
  }

  async init() {
    await this.descFetch();
  }

  async descFetch() {
    const url = new URL('/product/desc', location.origin),
    option = {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' }
    };

    await fetch(url, option)
      .then((response) => response.json())
      .then((json) => {
        this.descArg = this.setState(json);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onProductImgClick(ev) {
    const node = ev.currentTarget,
    main_img = this.querySelector('[data-action="main_product_img"]').children[0];

    main_img.setAttribute('src', node.dataset.src);
    main_img.setAttribute('alt', node.dataset.alt);
  }

  eventInit() {
    this.querySelectorAll("[data-action='product-img']").forEach((el, i, arr) => {
      el.addEventListener('click', this.onProductImgClick);
    });
  }

  destroy() {
    this.querySelectorAll("[data-action='product-img']").forEach((el, i, arr) => {
      el.removeEventListener('click', this.onProductImgClick);
    });
  }

  async render() {
    const arg = this.descArg.get();

    let html = `
      <div class="container">
        <div class="row" style="--justify-content: space-between;">
          <div class="img" data-action="main_product_img">
            <img src="${arg.desc[0].src}" alt="${arg.desc[0].alt}">
          </div>
          <div class="col">
            <div class="heading-lg">
              고품격 명함

              <div class="spacer" style="--height: 17px;"></div>
              <div class="display-md">
                와이드한 명함을 원한다면? 황금비율 90x50 명함 추천드려요!
              </div>

              <div class="spacer" style="--height: 17px;"></div>
              <div class="divider"></div>
            </div>
            <div class="body">
              <div class="row" style="--gap: 20px;">
                <div class="label-sm">예상출고일</div>
                <div class="label-sm">2023.09.27(수요일)</div>
              </div>
              <div class="row" style="--gap: 20px;">
                <div class="label-sm">상담문의</div>
                <div class="label-sm">02.466.9009(내선번호 218, 219, 236, 262, 263(수요일)</div>
              </div>
              <div class="row" style="--gap: 20px;">
                <div class="label-sm">접수마감</div>
                <div class="label-sm">월 - 금 20:00(수요일)</div>
              </div>
            </div>
            <div class="row" style="--gap: 10px;">
    `;

    arg.desc.forEach((el, i, arr) => {
      html += `
        <div class="img cursor" style="--cursor: pointer;" data-action="product-img" data-src="${el.src}" data-alt="${el.alt}">
          <img src="${el.src}" alt="${el.alt}">
        </div>
      `;
    });

    html += `
            </div>

            <div class="spacer" style="--height: 17px;"></div>
            <div class="heading-md" style="--font-weight: bold;">유의사항</div>
            <div class= "warning-box">
              <div class="label-lg red">* 조판 사정에 따라 출고일이 지연될 수 있습니다.(당일판 포함)</div>
              <div class="label-lg gap20"> - 조판 사정에 따라 출고일이 지연될 수 있습니다.(당일판 포함)</div>
              <div class="label-lg gap20"> - 조판 사정에 따라 출고일이 지연될 수 있습니다.(당일판 포함)</div>
              <div class="label-lg gap20"> - 조판 사정에 따라 출고일이 지연될 수 있습니다.(당일판 포함)</div>
              <div class="label-lg gap20"> - 조판 사정에 따라 출고일이 지연될 수 있습니다.(당일판 포함)</div>
              <div class="label-lg gap20"> - 조판 사정에 따라 출고일이 지연될 수 있습니다.(당일판 포함)</div>
              <div class="label-lg gap20"> - 조판 사정에 따라 출고일이 지연될 수 있습니다.(당일판 포함)</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}