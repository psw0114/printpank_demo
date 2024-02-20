import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';
import { modal } from '../../data/product.js';

export default class Receipt extends PBElement {
  modalArg = modal;

  constructor() {
    super();

    this.onShowReceiptClick = this.onShowReceiptClick.bind(this);
    this.onModalClick = this.onModalClick.bind(this);
  }

  async init() {
    this.arg = this.setState(this.arg);
  }

  onShowReceiptClick(ev) {
    const node = ev.currentTarget;

    node.classList.toggle('active');

    if (node.classList.contains('active')) {
      node.classList.replace("icon-up-btn", "icon-down-btn");
    } else {
      node.classList.replace("icon-down-btn", "icon-up-btn");
    }
  }

  onModalClick(ev) {
    const node = ev.currentTarget,
    modal = this.querySelector('[is="pb-modal"]');

    modal.setAttribute('data-title', node.dataset.title);

    modal.arg.set({
      ...modal.arg.get(),
      index: node.dataset.index,
      data: this.arg.get('item')[node.dataset.index],
      type: node.dataset.type
    });
  }

  eventInit() {
    this.querySelectorAll('[data-action="show-receipt"]').forEach((el, i, arr) => {
      el.addEventListener('click',this.onShowReceiptClick);
    });

    this.querySelectorAll('[data-action="modal"]').forEach((el, i, arr) => {
      el.addEventListener('click',this.onModalClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="show-receipt"]').forEach((el, i, arr) => {
      el.removeEventListener('click',this.onShowReceiptClick);
    });

    this.querySelectorAll('[data-action="modal"]').forEach((el, i, arr) => {
      el.removeEventListener('click',this.onModalClick);
    });
  }

  async render() {
    let html = `
      <div class="container">
        <div class="receipt">
          <div class="updown-btn cursor icon-up-btn" style="--cursor:pointer" data-action="show-receipt"></div>
          <div class="receipt-content">
           <div class="side-menu">
              <div class="card">
                <div class="heading-md">고품격명함</div>
                <div class="spacer" style="--height: 17px;"></div>
                <div class="body">
                  <div class="item body-lg" style="--justify-content: space-between; --font-weight: normal;">
                    <div>규격</div>
                    <div>단면인쇄(4도) / 90x50mm</div>
                  </div>
                  <div class="item body-lg" style="--justify-content: space-between; --font-weight: normal;">
                    <div>용지</div>
                    <div>스노우 250g</div>
                  </div>
                  <div class="item body-lg" style="--justify-content: space-between; --font-weight: normal;">
                    <div>수량</div>
                    <div>500매/ 1건</div>
                  </div>
                </div>
                <div class="spacer" style="--height: 10px"></div>
                <div class="divider"></div>
                <div class="spacer" style="--height: 10px"></div>
                <div class="body">
                  <div class="item body-lg" style="--justify-content: space-between; --font-weight: normal;">
                    <div>앞면박</div>
                    <div>앞_금박(유광) 30x25mm 이하</div>
                  </div>
                  <div class="item body-lg" style="--justify-content: space-between; --font-weight: normal;">
                    <div>뒷면박</div>
                    <div>뒤_금박(유광) 30x25mm 이하</div>
                  </div>
                  <div class="item body-lg" style="--justify-content: space-between; --font-weight: normal;">
                    <div>형압</div>
                    <div>돌출형압</div>
                  </div>
                </div>
                <div class="spacer" style="--height: 10px"></div>
                <div class="divider"></div>
                <div class="spacer" style="--height: 10px"></div>
                <div class="body">
                  <div class="item body-lg" style="--justify-content: space-between; --font-weight: normal;">
                    <div>인쇄비</div>
                    <div>앞_금박(유광) 30x25mm 이하</div>
                  </div>
                  <div class="item body-lg" style="--justify-content: space-between; --font-weight: normal;">
                    <div>부가세</div>
                    <div>3,000원</div>
                  </div>
                  <div class="item body-lg" style="--justify-content: space-between; --font-weight: normal;">
                    <div>예상출고일</div>
                    <div>2023.10.02(월요일)</div>
                  </div>
                </div>
                <div class="spacer" style="--height: 10px"></div>
                <div class="divider"></div>
              </div>
            </div>
          </div>
          <div class="total-price body-lg row" style="--align-items:center; --justify-content:space-between">
            <div class="heading-lg">총 가격 : </div>
            <div class="heading-lg red"> 30,000 원</div>
            <div>
              <button class="btn btn-md fill-blue round-sm" data-action="modal" data-type="A" data-title="구매하기" data-index="1">구매하기</button>
              <button class="btn btn-md outline-blue round-sm" data-action="modal" data-type="B" data-title="장바구니" data-index="2">장바구니</button>
            </div>
          </div>
        </div>
      </div>
      <div is="pb-modal" data-root="pb-product-receipt" data-arg="modalArg"></div>
    `;

    this.innerHTML = html;
  }
}