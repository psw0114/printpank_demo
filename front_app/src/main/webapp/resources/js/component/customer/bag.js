import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Bag extends PBElement {
  constructor() {
    super();

    this.onSubMenuClick = this.onSubMenuClick.bind(this);
  }

  async init() {
    await this.getCustomerDownload();
  }

  async getCustomerDownload() {
    const url = new URL('customer/download', location.origin),
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

  eventInit() {
    this.querySelectorAll('[data-action="sub-menu"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onSubMenuClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="sub-menu"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onSubMenuClick);
    });
  }

  async render() {
    const arg = this.arg.get();

    let html = `
      <div class="title-md" style="--font-weight: bold;">
        봉투 칼선 다운로드
      </div>
      <div class="row data-search" style="--align-items: center; --justify-content: end;">
        <input class="input-md" type="text" style="--width: 180px;" data-action="search" placeholder="칼선검색">
        <button class="btn btn-md round-md fill-blue body-sm" data-action="search">
          조회
        </button>
      </div>
      <div class="tab body-md" style="--height: 60px; --font-weight: normal;">
    `;

    arg.btn.forEach((el, i, arr) => {
      html += `
        <div class="tabs ${el.active ? "active" : ""}" data-action="sub-menu" data-index="${i}">
          ${el.text}
        </div>
      `;
    });

    html += `
      </div>
      <table style="--table-height: 60px; --font-size: 1.6rem;">
        <tr class="thead heading-sm">
          <td class="num">번호</td>
          <td class="divide">구분</td>
          <td class="size">사이즈</td>
          <td class="file-name">칼선파일명</td>
          <td class="empty"></td>
          <td class="file-name">파일</td>
        </tr>
    `;

    arg.item.forEach((el, i, arr) => {
      html += `
        <tr>
          <td class="num">${el.num}</td>
          <td class="divide">${el.divide}</td>
          <td class="size">${el.size}</td>
          <td class="file-name">${el.file_name}</td>
          <td class="empty"></td>
          <td class="file-name">
            <button class="btn btn-sm round-sm fill-blue" style="--min-height: 40px;" data-action="item">
              다운로드
            </button>
          </td>
        </tr>
      `;
    });

    html += `</table>`;

    this.innerHTML = html;
  }
}