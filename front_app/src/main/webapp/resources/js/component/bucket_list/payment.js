import { modal } from "../../data/payment.js";
import PBElement from "../../utils/pb_element.js";
import Utils from "../../utils/utils.js";

export default class Payment extends PBElement {
  modalArg = modal;

  constructor() {
    super();

    this.onModalClick = this.onModalClick.bind(this);
    this.onHowPayCheck = this.onHowPayCheck.bind(this);
    this.onMoreClick = this.onMoreClick.bind(this);
    this.onCheckClick = this.onCheckClick.bind(this);
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

  onHowPayCheck(ev) {
    const node = ev.currentTarget;

    this.querySelectorAll('.receipt [data-action="modal"]').forEach((el, i, arr) => {
      el.dataset.title = node.dataset.title;
      el.dataset.type = node.dataset.type;
    });
  }

  onMoreClick(ev) {
    const node = ev.currentTarget;

    this.querySelector('.detail').classList.toggle('active');
  }

  onCheckClick(ev) {
    const node = ev.currentTarget;

    this.querySelectorAll('.receipt [data-action="modal"]').forEach((el, i, arr) => {
      if(node.checked){
        el.removeAttribute('disabled');
      } else {
        el.setAttribute('disabled','true');
      }
    });
  }

  eventInit() {
    this.querySelectorAll('[data-action="modal"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onModalClick);
    });

    this.querySelectorAll('[data-action="select"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onHowPayCheck);
    });

    this.querySelectorAll('[data-action="more"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onMoreClick);
    });

    this.querySelectorAll(['[data-action="check"]']).forEach((el, i, arr)=>{
      el.addEventListener('click', this.onCheckClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="modal"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onModalClick);
    });

    this.querySelectorAll('[data-action="select"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onHowPayCheck);
    });

    this.querySelectorAll('[data-action="more"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onMoreClick);
    });

    this.querySelectorAll(['data-action="check"']).forEach((el, i, arr)=>{
      el.removeEventListener('click', this.onCheckClick);
    });
  }

  async render() {
    const item = [],
    params = this.getParams();

    params.set('step', 1);

    this.arg.get('item').forEach((el, i, arr) => {
      el.quantity.forEach((s_el, s_i, s_arr) => {
        if (s_el.checked) {
          item.push({
            ...el,
            quantity: s_el
          });
        }
      });
    });

    let html = `
      <div class="container">
        <div class="payment-ready body-lg">결제대기 ${item.length}건</div>
        <div class="payment-main row">
          <div class="context col">
    `;

    item.forEach((it, i, arr) => {
      html += `
        <div class="card">
          <div class="body">
            <div class="item">
              <img src="${it.src}" alt="img" style="--img-size: 100px;">
              <div class="desc col">
                <div class="display-lg" style="--font-weight: bold;">${it.pdname}</div>
                <div class="display-md text">${it.optionlist}</div>
                <div class="row display-md" style="--align-items: center; --font-weight: 600; --gap: 10px;">
                  <button class="btn btn-md display-md" data-action="modal" data-type="A" data-title="주문상세" data-index="${i}">주문상세</button>
                  <div>${it.quantity.quantity}매 / ${it.case}건</div>
                  <div>${it.quantity.parcel}</div>
                </div>
                <div class="price display-lg red" style="--font-weight: bold;">${Utils.numberFormat(it.price)} 원</div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    html += `
          </div>
          <div class="receipt card flow">
            <div class="heading-md">결제정보</div>
            <div class="spacer" style="--height: 17px;"></div>
            <div class="body">
              <div class="item body-lg" style="--justify-content: space-between; --font-weight: normal;">
                <div>전체 미수금</div>
                <div>10,000원</div>
              </div>
              <div class="item body-lg" style="--justify-content: space-between; --font-weight: normal;">
                <div>주문금액</div>
                <div>${Utils.numberFormat(item.reduce((acc, cur, i, arr) => acc + cur.price, 0))} 원</div>
              </div>
              <div class="item body-lg" style="--justify-content: space-between; --font-weight: normal;">
                <div>배송비</div>
                <div>3,000원</div>
              </div>
              <div class="item body-lg" style="--justify-content: space-between; --font-weight: normal;">
                <div>부가세(vat)</div>
                <div>3,000원</div>
              </div>
            </div>
            <div class="spacer" style="--height: 10px"></div>
            <div class="divider"></div>
            <div class="spacer" style="--height: 17px"></div>
            <div class="row body-lg" style="--justify-content: space-between;">
              <div>총 결제금액</div>
              <div class="red">${Utils.numberFormat(item.reduce((acc, cur, i, arr) => acc + cur.price, 0))} 원</div>
            </div>
            <div class="spacer" style="--height: 17px"></div>
            <div class="divider"></div>
            <div class="spacer" style="--height: 17px"></div>
            <div class="heading-md">결제방법</div>
            <div class="spacer" style="--height: 17px"></div>
            <div class="input-group row" style="--gap: 10px;">
              <input type="radio" data-action="select" data-type="B" data-title="카드결제" name="paymentType" id="paymentType_1" value="A" checked>
              <label class="body-lg" for="paymentType_1" style="--font-weight: normal;">카드결제</label>
            </div>
            <div class="spacer" style="--height: 10px"></div>
            <div class="input-group row" style="--gap: 10px;">
              <input type="radio" data-action="select" data-type="C" data-title="전용계좌" name="paymentType" id="paymentType_2" value="B">
              <label class="body-lg" for="paymentType_2" style="--font-weight: normal;">전용계좌 입급</label>
            </div>
            <div class="spacer" style="--height: 17px"></div>
            <div class="divider"></div>
            <div class="spacer" style="--height: 17px"></div>
            <div class="input-group row" style="--gap: 10px;">
              <input type="checkbox" name="agree" id="agree" data-action="check" autocomplete="off" />
              <label class="body-lg" for="agree">주문내역 확인 및 이용약관 동의</label>
              <div class="icon-down cursor" data-action="more" style="--cursor: pointer;"></div>
            </div>
            <div class="spacer" style="--height: 10px"></div>
            <div class="detail">
              ㄴ 전자금융거래 이용약관 동의 <span class="more-detail">약관보기</span>
            </div>
            <div class="spacer" style="--height: 10px"></div>
            <button class="btn btn-lg round-md fill-blue heading-sm" style="--min-width: 100%; --min-height: 50px;" data-action="modal" data-type="B" data-title="카드결제" disabled>
              ${Utils.numberFormat(item.reduce((acc, cur, i, arr) => acc + cur.price, 0))}원 결제하기
            </button>
          </div>
        </div>
      </div>
      <div is="pb-modal" data-root="pb-bucketlist-payment" data-arg="modalArg"></div>
    `;

    this.innerHTML = html;
  }
}