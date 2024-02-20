import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Manage extends PBElement {
  constructor() {
    super();
  }

  async init() {
    await this.managerFetch();
  }

  async managerFetch() {
    const url = new URL('/my_page/manager', location.origin),
    option = {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' }
    };

    await fetch(url, option)
      .then((response) => response.json())
      .then((json) => {
        this.managerArg = this.setState(json);
      })
      .catch((e) => {
        console.log(e);
      });
  }


  async render() {
    const arg = this.managerArg.get();

    let html = `
      <div class="title-md" style="--font-weight: bold;">
        담당자 관리
      </div>

      <div class="spacer" style="--height:30px;"></div>
      <div class="body-md">
        <p>제품관련 문의나 전달사항은 담당자에게 연락이 갑니다.</p>
      </div>

      <div class="spacer" style="--height:40px;"></div>
      <div class="row" style="--align-items:center">
        <div class="icon-error"></div>
        <div class="display-lg" style="--font-weight: bold;">등록된 담당자 : <span class="red">0</span> 명</div>
      </div>
      <div class="input-group display-lg" data-action="check-all">
          <label for="check-all">전체선택</label>
          <input type="checkbox" name="check-all" id="check-all" autocomplete="off" />
      </div>

      <div class="spacer" style="--height:20px;"></div>
      <table>
        <tr>
          <td>번호</td>
          <td>담당자 이름</td>
          <td>휴대전화</td>
          <td>유선전화</td>
          <td>선택</td>
        </tr>
    `;

    if (Utils.empty(arg)) {
      html += `
        <tr>
          <td colspan="5">등록된 담당자가 없습니다.</td>
        </tr>
      `;
    } else {
      arg.managerlist.forEach((el, i, arr) => {
        html += `
          <tr>
            <td>${i}</td>
            <td>${el.manager}</td>
            <td>${el.phone}</td>
            <td>${el.call}</td>
            <td><input type="checkbox" data-action="check" data-index=${i} autocomplete="off" /></td>
          </tr>
        `;
      });
    }

    html += `
      </table>

      <div class="spacer" style="--height:20px;"></div>
      <div class="btn-area row" style="--justify-content:center">
        <button class="btn btn-md round-sm fill-blue body-sm" style="--min-height:45px;--min-width:100px;">추가하기</button>
        <button class="btn btn-md round-sm fill-red body-sm" style="--min-height:45px;--min-width:100px;">삭제하기</button>
      </div>
    `;

    this.innerHTML = html;
  }
}