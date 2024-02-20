import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Parcel extends PBElement {
  constructor() {
    super();

    this.onDelBtnClick = this.onDelBtnClick.bind(this);
  }

  async init() {
    await this.parcelFetch();
  }

  async parcelFetch() {
    const url = new URL('/my_page/parcel', location.origin),
    option = {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' }
    };

    await fetch(url, option)
      .then((response) => response.json())
      .then((json) => {
        this.parcelArg = this.setState(json);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onDelBtnClick(ev) {
    const node = ev.currentTarget;
  }

  eventInit() {
    this.querySelectorAll('[data-action="del"]').forEach((el, i, arr) => {
      el.addEventListener('click',this.onDelBtnClick);
    });
  }

  async render() {
    const arg = this.parcelArg.get();

    let html = `
      <div class="title-md" style="--font-weight: bold;">
        배송지 관리
      </div>

      <div class="spacer" style="--height:30px;"></div>
      <div class="display-lg">
        <p>고객님이 자주 보내는 배송지를 등록/수정/삭제 할 수 있으며, 주문시에도 배송지를 편리하게 선택/삭제/등록 할 수 있습니다.</p>
        <p>배송지 관리 관련 다른 문의는 고객센터 Q&A 게시판 또는 전화 02)466.9009 내선 203, 204, 265 으로 문의 바랍니다.</p>
      </div>

      <div class="spacer" style="--height:30px;"></div>
      <table class="parcel-search">
        <tr>
          <td>이름/상호</td>
          <td>
            <input class="input-md" type="text">
          </td>
          <td>배송주소</td>
          <td>
            <input class="input-md" type="text">
          </td>
          <td>휴대전화</td>
          <td>
            <input class="input-md" type="text">
          </td>
          <td>유선전화</td>
          <td>
            <input class="input-md" type="text">
          </td>
        </tr>
      </table>

      <div class="spacer" style="--height:20px;"></div>
      <div class="btn-area row" style="--justify-content:center;">
        <button class="btn btn-md round-sm fill-blue body-sm" style="--min-height:45px;--min-width:100px;">조회하기</button>
        <button class="btn btn-md round-sm fill-red body-sm" style="--min-height:45px;">배송지 추가하기</button>
      </div>

      <div class="spacer" style="--height:40px;"></div>
      <div class="row" style="--align-items:center;--gap:10px;">
        <div class="icon-error"></div>
        <div class="display-lg" style="--font-weight: bold;">등록된 전체 배송지 : <span class="red">0</span> 건</div>
      </div>
      <div class="input-group display-lg" data-action="check-all">
          <label for="check-all">전체선택</label>
          <input type="checkbox" name="check-all" id="check-all" autocomplete="off" />
      </div>

      <div class="spacer" style="--height:20px;"></div>
      <table>
        <tr>
          <td>번호</td>
          <td>이름/상호</td>
          <td>휴대전화</td>
          <td>유선전화</td>
          <td>배송주소</td>
          <td>선택</td>
        </tr>`
    ;

    if (Utils.empty(arg)) {
      html += `
        <tr>
          <td colspan="6">등록된 배송지가 없습니다.</td>
        </tr>
      `;
    } else {
      arg.parcel.forEach((el, i, arr) => {
        html += `
          <tr>
            <td>${i}</td>
            <td>${el.name}</td>
            <td>${el.phone}</td>
            <td>${el.call}</td>
            <td>${el.address}</td>
            <td><input type="checkbox" name="check" data-index=${i} data-action="check" autocomplete="off" /></td>
          </tr>
        `;
      });
    }

    html += `
      </table>

      <div class="spacer" style="--height:20px;"></div>
      <div class="btn-area row" style="--justify-content:center">
        <button class="btn btn-md round-sm fill-red body-sm" style="--min-height:45px;--min-width:100px;" data-action="del">삭제하기</button>
      </div>
    `;

    this.innerHTML = html;
  }
}