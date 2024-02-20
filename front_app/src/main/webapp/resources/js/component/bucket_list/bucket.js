import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';
import { modal } from '../../data/bucket_list.js';

export default class Bucket extends PBElement {
  modalArg = modal;

  constructor() {
    super();

    this.onCheckAllClick = this.onCheckAllClick.bind(this);
    this.onCheckClick = this.onCheckClick.bind(this);
    this.onDelClick = this.onDelClick.bind(this);
    this.onModalClick = this.onModalClick.bind(this);
    this.onProductOrderClick = this.onProductOrderClick.bind(this);
    this.onOptionDetailConfirm = this.onOptionDetailConfirm.bind(this);
    this.onWorkMemoConfirm = this.onWorkMemoConfirm.bind(this);
    this.onParcelConfirm = this.onParcelConfirm.bind(this);
    this.onPartitionConfirm = this.onPartitionConfirm.bind(this);
    this.onPartitionCancelClick = this.onPartitionCancelClick.bind(this);
  }

  onCheckAllClick(ev) {
    const node = ev.currentTarget;

    this.arg.set(
      'item',
      this.arg.get('item').map((el, i, arr) => {
        return {
          ...el,
          quantity: el.quantity.map((s_el, s_i, s_arr) => {
            return {
              ...s_el,
              checked: node.checked
            }
          })
        }
      })
    );
  }

  onCheckClick(ev) {
    const node = ev.currentTarget;

    this.arg.set(
      'item',
      this.arg.get('item').map((el, i, arr) => {
        return {
          ...el,
          quantity: (i == node.dataset.index)
            ? el.quantity.map((s_el, s_i, s_arr) => {
              return {
                ...s_el,
                checked: (s_i == node.dataset.subIndex)
                  ? node.checked
                  : s_el.checked
              }
            })
            : el.quantity
        }
      })
    );
  }

  onDelClick(ev) {
    const node = ev.currentTarget;

    this.arg.set(
      'item',
      this.arg.get('item').filter((el, i, arr) => i != node.dataset.index)
    );
  }

  onModalClick(ev) {
    const node = ev.currentTarget,
    modal = this.querySelector('[is="pb-modal"]');

    modal.setAttribute('data-title', node.dataset.title);

    if (Utils.empty(node.dataset.index)) {
      modal.arg.set({
        ...modal.arg.get(),
        type: node.dataset.type
      });
    } else {
      modal.arg.set({
        ...modal.arg.get(),
        index: node.dataset.index,
        data: this.arg.get('item')[node.dataset.index],
        type: node.dataset.type
      });
    }
  }

  onProductOrderClick(ev) {
    this.arg.set({
      ...this.arg.get(),
      step: 2
    });
  }

  onOptionDetailConfirm(ev) {
    const detail = ev.detail;

    this.arg.set(
      'item',
      this.arg.get('item').map((el, i, arr) => {
        return ((i == detail.index)
          ? detail.data
          : el
        );
      })
    );
  }

  onWorkMemoConfirm(ev) {
    const detail = ev.detail;

    this.arg.set(
      'item',
      this.arg.get('item').map((el, i, arr) => {
        return ((i == detail.index)
          ? detail.data
          : el
        );
      })
    );
  }

  onParcelConfirm(ev) {
    const detail = ev.detail;

    this.arg.set(
      'item',
      this.arg.get('item').map((el, i, arr) => {
        return {
          ...el,
          quantity: el.quantity.map((q_el, q_i, q_arr) => {
            return {
              ...q_el,
              parcel: (q_el.checked)
                ? detail
                : q_el.parcel
            }
          })
        };
      })
    )
  }

  onPartitionConfirm(ev) {
    const detail = ev.detail;

    this.arg.set(
      'item',
      this.arg.get('item').map((el, i, arr) => {
        return ((i == detail.index)
          ? detail.data
          : el
        );
      })
    );
  }

  onPartitionCancelClick(ev) {
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
    this.querySelectorAll('[data-action="check-all"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onCheckAllClick);
    });

    this.querySelectorAll('[data-action="check"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onCheckClick);
    });

    this.querySelectorAll('[data-action="del"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onDelClick);
    });

    this.querySelectorAll('[data-action="modal"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onModalClick);
    });

    this.querySelectorAll('[data-action="product-order"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onProductOrderClick);
    });

    this.querySelectorAll('[data-action="partition-cancel"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onPartitionCancelClick);
    });

    this.addEventListener('option-detail-confirm', this.onOptionDetailConfirm);

    this.addEventListener('work-memo-confirm', this.onWorkMemoConfirm);

    this.addEventListener('parcel-confirm', this.onParcelConfirm);

    this.addEventListener('partition-confirm', this.onPartitionConfirm);
  }

  destroy() {
    this.querySelectorAll('[data-action="check-all"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onCheckAllClick);
    });

    this.querySelectorAll('[data-action="check"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onCheckClick);
    });

    this.querySelectorAll('[data-action="del"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onDelClick);
    });

    this.querySelectorAll('[data-action="modal"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onModalClick);
    });

    this.querySelectorAll('[data-action="product-order"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onProductOrderClick);
    });

    this.removeEventListener('option-detail-confirm', this.onOptionDetailConfirm);

    this.removeEventListener('work-memo-confirm', this.onWorkMemoConfirm);

    this.removeEventListener('parcel-confirm', this.onParcelConfirm);

    this.removeEventListener('partition-confirm', this.onPartitionConfirm);
  }

  async render() {
    const arg = this.arg.get(),
    params = this.getParams();

    let checkedArr = [];

    arg.item.forEach((el, i, arr) => {
      el.quantity.forEach((s_el, s_i, s_arr) => {
        if (s_el.checked) {
          checkedArr.push(s_el);
        }
      })
    });

    const isTrue = (checkedArr.length < 1) ? false : checkedArr.every((a)=> a.checked && (a.parcel == true));

    params.set('step', 1);

    let html = `
      <div class="container">
        <div class="input-group">
          <input type="checkbox" id="check-all" data-action="check-all" ${arg.item.every((el) => el.quantity.every((s_el) => s_el.checked)) ? 'checked' : ''} autocomplete="off" />
          <label class="body-lg" for="check-all">전체선택</label>
        </div>
        <div class="bucketlist-main row">
          <div class="context col">
            <div class="title display-md">상품정보</div>
    `;

    arg.item.forEach((el, i, arry) => {
      el.quantity.forEach((q_el, q_i, q_arr) => {
        html += `
          <div class="card ${((el.quantity.length > 1) && (q_i > 0)) ? 'sub' : ''}">
            <div class="body">
              <div class="item">
                <div class="input-group">
                  <input type="checkbox" data-action="check" data-index="${i}" data-sub-index="${q_i}" ${q_el.checked ? 'checked' : ''} autocomplete="off" />
                </div>
                <img src="${el.src}" alt="img" style="--img-size: 100px;">
                <div class="desc col">
                  <div class="display-lg" style="--font-weight: bold;">${el.pdname}</div>
                  <div class="display-md text">${el.optionlist} / ${Utils.numberFormat(q_el.quantity)}매 ${Utils.numberFormat(el.itemCase)}건</div>
                  <div class="row display-md" style="--align-items: center; --font-weight: 600; --gap: 10px;">
                    <button class="btn btn-md display-md" data-action="modal" data-index="${i}" data-title="옵션상세" data-type="A">옵션상세</button>
                    <button class="btn btn-md display-md" data-action="del" data-index="${i}">삭제</button>
                    <div>${q_el.parcel ? '배송지 입력완료' : ''}</div>
                  </div>
                </div>
                <div class="desc display-md" style="--dsec-gap: 10px;">
                  <button class="btn btn-md fill-blue" data-action="modal" data-index="${i}" data-title="파일업로드" data-type="B">파일업로드</button>
                  <button class="btn btn-md" data-action="modal" data-index="${i}" data-title="작업메모" data-type="C">작업메모</button>
                  ${(el.quantity.length > 1)
                    ? `<button class="btn btn-md outline-blue display-md" data-action="partition-cancel" data-index="${i}" data-sub-index="${q_i}" data-type="D" data-title="분할수정">분할수정</button>`
                    : `<button class="btn btn-md outline-blue display-md" data-action="modal" data-index="${i}" data-title="분할배송" data-type="D">분할배송</button>`
                  }
                </div>
              </div>
              <div class="foot-area row" style="--justify-content:space-between;width:100%">
                <div class="memo display-sm">${el.memo}</div>
                <div class="price red heading-sm">${Utils.numberFormat(el.price)}원</div>
              </div>
            </div>
          </div>
        `;
      });
    });

    html += `
          </div>
          <div class="card flow">
            <div class="heading-md">결제예정금액</div>
            <div class="spacer" style="--height: 17px;"></div>
            <div class="body">
              <div class="item body-lg" style="--justify-content: space-between; --font-weight: normal;">
                <div>주문금액</div>
                <div>${Utils.numberFormat(arg.item.reduce((acc, cur, i, arr) => acc + cur.price, 0))}원</div>
              </div>
              <div class="item body-lg" style="--justify-content: space-between; --font-weight: normal;">
                <div>배송비</div>
                <div>${Utils.numberFormat(10000)}원</div>
              </div>
              <div class="item body-lg" style="--justify-content: space-between; --font-weight: normal;">
                <div>부가세(vat)</div>
                <div>${Utils.numberFormat(10000)}원</div>
              </div>
            </div>
            <div class="spacer" style="--height: 10px"></div>
            <div class="divider"></div>
            <div class="spacer" style="--height: 17px"></div>
            <div class="body-lg">
              <div>총 결제금액</div>
            </div>
            <div class="row body-lg" style="--justify-content: end;">
              <div class="red">${Utils.numberFormat(arg.item.reduce((acc, cur, i, arr) => acc + cur.price, 0) + 20000)}원</div>
            </div>
            <div class="buttons heading-sm">
              <button class="btn btn-lg round-md fill-blue" ${isTrue ? '' : 'disabled'} style="--min-width: 100%;" data-action="product-order" data-pb-link="${location.pathname}?${params}">선택상품 주문하기</button>
              <button class="btn btn-lg round-md outline-blue" ${arg.item.some((el) => el.quantity.some((s_el) => s_el.checked)) ? '' : 'disabled'} style="--min-width: 100%;" data-action="modal" data-type="E" data-title="배송지 입력">배송지 입력</button>
            </div>
          </div>
        </div>
      </div>
      <div is="pb-modal" data-root="pb-bucketlist-bucket" data-arg="modalArg"></div>
    `;

    this.innerHTML = html;
  }
}