import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Notice extends PBElement {
  constructor() {
    super();

    this.onItemClick = this.onItemClick.bind(this);
    this.onSubMenuClick = this.onSubMenuClick.bind(this);
  }

  async init() {
    await this.getCustomerNotice();
  }

  async getCustomerNotice() {
    const url = new URL('customer/notice', location.origin),
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

  onItemClick(ev) {
    const node = ev.currentTarget;

    this.arg.set(
      'item',
      this.arg.get('item').map((el, i, arr) => {
        return {
          ...el,
          active: !el.active && (i == node.dataset.index)
        };
      })
    );
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
  };

  eventInit() {
    this.querySelectorAll('[data-action="item"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onItemClick);
    });

    this.querySelectorAll('[data-action="sub-menu"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onSubMenuClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="item"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onItemClick);
    });

    this.querySelectorAll('[data-action="sub-menu"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onSubMenuClick);
    });
  }

  async render() {
    const arg = this.arg.get();
    console.log(arg);
    let html = `
      <div class="title-md" style="--font-weight: bold;">
        공지사항
      </div>
      <div class="search">
        <div class="heading-lg">
          <span class="blue">공지사항</span>을 꼭 확인해주세요.
        </div>
        <div class="body-sm">
          프린트뱅크에서 안내드리는 공지사항 입니다. 꼭 확인해 주시기 바랍니다.
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
        <button class="btn btn-md round-lg ${(el.active) ? 'fill-blue' : ''}" data-action="sub-menu" data-index="${i}">
          ${el.text}
        </button>
      `;
    });

    html += `
      </div>
      <div class="list col">
    `;

    arg.item.forEach((el, i, arr) => {
      html += `
        <div class="item cursor " style="--cursor: pointer;" data-action="item" data-index="${i}">
          <div class="row">
          	<div class="type display-lg">
    	  		${el.type}
          	</div>
            <div class="text col body-lg" style="--font-weight: normal;">
              ${el.title}
            </div>
            <div class="body-lg">
              ${el.date}
            </div>
          </div>
          <div class="content display-lg ${(el.active) ? 'active' : ''}">
            ${el.text}
          </div>
        </div>
      `;
    });

    html += `</div>`;

    this.innerHTML = html;
  }
}