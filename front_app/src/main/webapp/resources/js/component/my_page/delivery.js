import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Delivery extends PBElement {
  constructor() {
    super();

    this.onSearchDateClick = this.onSearchDateClick.bind(this);
  }

  async init() {
    await this.deliveryFetch();
  }

  async deliveryFetch() {
    const url = new URL('/my_page/delivery', location.origin),
    option = {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' }
    };
    await fetch(url, option)
    .then((response) => response.json())
    .then((json) => {
      this.deliveryArg = this.setState(json);
    })
    .catch((e) => {
      console.log(e);
    });
  }

  onSearchDateClick(ev) {
    const node = ev.currentTarget;

    this.querySelectorAll('[data-action="search-date"]').forEach((el, i, arr) => {
      if (el == node) {
        el.classList.add('fill-blue');
      } else {
        el.classList.remove('fill-blue');
      }
    });
  }

  // onItemClick(ev) {
  //   const node = ev.currentTarget;

  //   const openmodal = document.querySelector('#content .modal-area');
  //   openmodal.classList.add('active');
  // }

  eventInit() {
    this.querySelectorAll('[data-action="search-date"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onSearchDateClick);
    });

    // this.querySelectorAll('[data-action="item"]').forEach((el, i, arr) => {
    //   el.addEventListener('click', this.onItemClick);
    // });
  }

  destroy() {
    this.querySelectorAll('[data-action="search-date"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onSearchDateClick);
    });

    // this.querySelectorAll('[data-action="item"]').forEach((el, i, arr) => {
    //   el.removeEventListener('click', this.onItemClick);
    // });
  }

  async render() {
    const arg = this.deliveryArg.get();

    let html = `
      <div class="title-md" style="--font-weight: bold;">
        주문/배송 내역
      </div>
      <div class="summary row" style="--align-items: center; --justify-content: space-evenly;">
    `;

    arg.summary.forEach((el, i, arr) => {
      html += `
        <div class="recipt">
          <div class="title-lg">${el.count}</div>
          <div class="body-sm" style="--font-weight: normal;">${el.text}</div>
        </div>
      `;
    });

    html += `
      </div>
      <div class="row" style="--align-items: center;">
        <div class="col" style="--flex: 60px 0 0;">
          <p class="body-sm">주문일</p>
        </div>
        <button class="btn btn-md round-md fill-blue" data-action="search-date">
          오늘
        </button>
        <button class="btn btn-md round-md" data-action="search-date">
          1개월
        </button>
        <button class="btn btn-md round-md" data-action="search-date">
          3개월
        </button>
        <input class="input-md" style="--width: 170px;" type="date">
        <p class="body-sm"> ~ </p>
        <input class="input-md" style="--width: 170px;" type="date">
      </div>

      <div class="spacer" style="--height: 10px;"></div>
      <div class="row" style="--align-items: center;">
        <div class="col" style="--flex: 60px 0 0;">
          <p class="body-sm">진행상태</p>
        </div>
        <select class="input-md" style="--width: 170px;">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <p class="body-sm">품목</p>
        <select class="input-md" style="--width: 170px;">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div class="spacer" style="--height: 10px;"></div>
      <div class="row" style="--align-items: center;">
        <div class="col" style="--flex: 60px 0 0;">
          <p class="body-sm">제작물명</p>
        </div>
        <input class="input-md" style="--width: 250px;" type="text" placeholder="명함">
        <p class="body-sm">주문번호</p>
        <input class="input-md" style="--width: 250px;" type="text" placeholder="RET20230912">
        <button class="btn btn-md round-md fill-blue" data-action="search">
          조회
        </button>
        <div class="col row" style="--justify-content: end;">
          <button class="btn btn-md round-md display-md" data-action="file-error">
            파일에러만 보기
          </button>
        </div>
      </div>

      <div class="spacer" style="--height: 20px;"></div>
      <div class="divider" style="--color: var(--color-1);"></div>

      <div class="spacer" style="--height: 10px;"></div>
    `;

    arg.items.forEach((el, i, arr) => {
      html += `
        <div class="row">
          <div class="card col">
            <div class="body" style="--gap: 10px;">
              <div class="item">
                <img class="img-box ss" src="${el.src}" alt="${el.alt}" style="--img-size: 100px;">
                <div class="desc col">
                  <div class="body-sm">결제 ${el.date}</div>
                  <div class="body-md">${el.pname}</div>
                  <div class="body-sm">${el.poption}</div>
                  <div class="body-md" style="--font-weight: bold;">${el.price}원</div>
                </div>
              </div>
              <div class="item" style="--justify-content: space-between;">
                <button class="col btn btn-md round-md body-md" style="--font-weight: normal;" data-action="item" data-type="뭔가 들어감">
                  주문상세
                </button>
                <button class="col btn btn-md round-md body-md" style="--font-weight: normal;" data-action="item" data-type="뭔가 들어감">
                  배송지 정보
                </button>
                <button class="col btn btn-md round-md body-md" style="--font-weight: normal;" data-action="item" data-type="뭔가 들어감">
                  구매확정완료
                </button>
                <button class="col btn btn-md round-md body-md" style="--font-weight: normal;" data-action="item" data-type="뭔가 들어감">
                  출고완료
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    this.innerHTML = html;
  }
}