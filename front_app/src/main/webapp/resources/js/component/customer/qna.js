import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class QNA extends PBElement {
  constructor() {
    super();

    this.onSubMenuClick = this.onSubMenuClick.bind(this);
  }

  async init() {
    await this.getCustomerQna();
  }

  async getCustomerQna() {
    const url = new URL('customer/qna', location.origin),
    option = {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' }
    };

    await fetch(url, option)
      .then((response) => response.json())
      .then((json) => {
        this.arg = this.setState(json);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onSubMenuClick(ev) {
    const node = ev.currentTarget;

    this.arg.set(
      'btn',
      this.arg.get('btn').map((el, i, arr) => {
        return {
          ...el,
          active: (i == node.dataset.index)
        };
      })
    );
  }

  // onDatebtnClick(ev) {
  //   const node = ev.currentTarget;

  //   this.querySelectorAll('[data-action="search-date"]').forEach((el, i, arr) => {
  //     if (el == node) {
  //       el.classList.add('fill-blue');
  //     } else {
  //       el.classList.remove('fill-blue');
  //     }
  //   });
  // }

  eventInit() {
    this.querySelectorAll('[data-action="sub-menu"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onSubMenuClick);
    });

    // this.querySelectorAll('[data-action="search-date"]').forEach((el, i, arr) => {
    //   el.addEventListener('click', this.onDatebtnClick);
    // });
  }

  destroy() {
    this.querySelectorAll('[data-action="sub-menu"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onSubMenuClick);
    });

    // this.querySelectorAll('[data-action="search-date"]').forEach((el, i, arr) => {
    //   el.removeEventListener('click', this.onDatebtnClick);
    // });
  }

  async render() {
    const arg = this.arg.get();

    let html = `
      <div class="title-md" style="--font-weight: bold;">
        1:1 문의
      </div>
      <div class="search">
        <div class="heading-lg">
          문의 전 <span class="blue">FAQ</span>를 확인해주세요.
        </div>
        <div class="body-sm">
          검색창을 이용하시면 쉽고 빠르게 내용을 찾아보고 문의를 해결할 수 있습니다.
        </div>
        <div class="input-group">
          <input class="input-lg col" style="--padding-left: 5%" type="text" data-action="search" placeholder="궁금하신 내용을 입력해 주세요.">
          <div class="icon-search-glass up" data-action="search"></div>
        </div>
      </div>
      <div class="row body-lg" style="--font-weight: normal; --align-items: center; --justify-content: center;">
    `;

    arg.btn.forEach((el, i, arr) => {
      html += `
        <button class="btn btn-md round-md ${(el.active) ? 'fill-blue' : ''}" style="--min-width: 150px; --min-height: 50px;" data-action="sub-menu" data-index="${i}">
          ${el.text}
        </button>
      `;
    });

    html += `
      </div>
      <div class="date-search">
        <div class="body-lg" style="--font-weight: normal;">
          나의 문의내역
        </div>
        <div class="body-sm" style="--font-weight: normal;">
          총 <span class="blue">${arg.item.length}</span>건이 조회되었습니다.
        </div>
        <div class="row btns" style="--align-items: center; --justify-content: space-around;">
          <button class="btn btn-md round-md fill-blue" data-action="search-date">
            오늘
          </button>
          <button class="btn btn-md round-md" data-action="search-date">
            1개월
          </button>
          <button class="btn btn-md round-md" data-action="search-date">
            3개월
          </button>
          <button class="btn btn-md round-md" data-action="search-date">
            6개월
          </button>
          <button class="btn btn-md round-md" data-action="search-date">
            1년
          </button>
          <input class="input-md" type="date" style="--width: 130px;">
          <p class="body-sm"> ~ </p>
          <input class="input-md" type="date" style="--width: 130px;">
          <p class="body-sm"> 문의유형 </p>
          <select class="input-md" style="--width: 100px;">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button class="btn btn-md round-md fill-blue" data-action="qna-search">
            조회
          </button>
        </div>
      </div>
      <table style="--table-height: 50px; --font-size: 1.6rem;">
        <tr class="thead">
          <td class="category">문의유형</td>
          <td class="detail">문의내역</td>
          <td class="order-num">주문번호</td>
          <td class="date">문의일</td>
          <td class="answer">답변여부</td>
        </tr>
    `;

    arg.item.forEach((el, i, arr) => {
      html += `
        <tr class="cursor" style="--cursor: pointer;" data-action="item">
          <td class="category">${el.type}</td>
          <td class="detail">${el.title}</td>
          <td class="order-num">${el.orderNum}</td>
          <td class="date">${el.date}</td>
          <td class="answer ${el.color}">${el.proc}</td>
        </tr>
      `;
    });

    html += `</table>`;

    this.innerHTML = html;
  }
}