import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class MyMtm extends PBElement {
  constructor() {
    super();
  }

  async init() {
    await this.mtmFetch();
  }

  async mtmFetch() {
    const url = new URL('/my_page/mtm', location.origin),
    option = {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' }
    };

    await fetch(url, option)
      .then((response) => response.json())
      .then((json) => {
        this.mtmArg = this.setState(json);
      })
      .catch((e) => {
        console.log(e);
      });
  }


  async render() {
    const arg = this.mtmArg.get();

    let html = `
      <div class="title-md" style="--font-weight: bold;">
        1:1 문의내역
      </div>

      <div class="spacer" style="--height:30px;"></div>
      <div class="date-search">
        <div class="body-sm" style="--font-weight: normal;">
          총 <span class="blue">0</span>건이 조회되었습니다.
        </div>

        <div class="spacer" style="--height:20px;"></div>
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

      <div class="spacer" style="--height:20px;"></div>
      <table>
        <tr>
          <td class="category">문의유형</td>
          <td class="detail">문의내역</td>
          <td class="order-num">주문번호</td>
          <td class="date">문의일</td>
          <td class="answer">답변여부</td>
        </tr>
    `;

    if (Utils.empty(arg)) {
      html += `
        <tr>
          <td colspan="5">등록된 문의가 없습니다.</td>
        </tr>
      `;
    } else {
      arg.mtm.forEach((el, i, arr) => {
        html += `
          <tr>
            <td class="category">${el.type}</td>
            <td class="detail">${el.title}</td>
            <td class="order-num">${el.pnum}</td>
            <td class="date">${el.date}</td>
            <td class="answer">${el.state}</td>
          </tr>
        `;
      });
    }

    html += `</table>`;

    this.innerHTML = html;
  }
}