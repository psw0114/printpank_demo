import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class MyInfo extends PBElement {
  constructor() {
    super();
  }

  async init() {
    await this.userInfoFetch();
  }

  async userInfoFetch() {
    const url = new URL('/my_page/user', location.origin),
    option = {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' }
    };

    await fetch(url, option)
      .then((response) => response.json())
      .then((json) => {
        this.userInfoArg = this.setState(json);
      })
      .catch((e) => {
        console.log(e);
      });
  }


  async render() {
    const arg = this.userInfoArg.get();

    let html = `
      <div class="title-md" style="--font-weight: bold;">
        회원정보수정
      </div>

      <div class="spacer" style="--height:30px;"></div>
      <div class="display-md">
        고객님의 소중한 정보를 관리할 수 있습니다. 비밀번호는 주기적으로 변경하여 주시기 바랍니다.
      </div>

      <div class="spacer" style="--height:30px;"></div>
      <table>
        <tr>
          <td>아이디</td>
          <td>
            ${arg.id}
          </td>
        </tr>
        <tr>
          <td>비밀번호</td>
          <td>
            <div class="row" style="--align-items:center">
              <input class="input-md" type="password" value="0000000" disabled> 공백없는 영문/숫자 조합의 4~12자 이내로 입력해주세요.
            </div>
          </td>
        </tr>
        <tr>
          <td>비밀번호 확인</td>
          <td>
            <div class="row" style="--align-items:center">
              <input class="input-md" type="password" value="0000000" disabled> 위 비밀번호와 동일하게 입력해주세요.
            </div>
          </td>
        </tr>
        <tr>
          <td>고객명</td>
          <td>${arg.name}</td>
        </tr>
        <tr>
          <td>전용계좌</td>
          <td>
            ${arg.account}
          </td>
        </tr>
        <tr>
          <td>이메일주소</td>
          <td>
            <input class="input-md" type="text" value="${arg.email}">
          </td>
        </tr>
        <tr>
          <td>유선전화</td>
          <td>
            <input class="input-md" type="number" value="${arg.phone}">
          </td>
        </tr>
        <tr>
          <td>팩스번호</td>
          <td>
            <input class="input-md" type="number" value="${arg.fax}">
          </td>
        </tr>
        <tr>
          <td>기본 배송방법</td>
          <td>
            <div class="row" style="--align-items:center">
              <select class="input-sm">
                <option value="1">선불택배</option>
                <option value="2">착불택배</option>
                <option value="3">방문(파주)</option>
                <option value="4" selected>방문(충무로)</option>
              </select>
              <span class="blue">장바구니에 표시되는 기본값 입니다.</span>
              <button class="btn btn-sm round-sm fill-red">무료배송 신청</button>
            </div>
          </td>
        </tr>
        <tr>
          <td>주소</td>
          <td>
            <div class="address">
              <div class="row" style="--align-items:center">
                <input class="input-md" type="text" style="--width:120px;" value="${arg.postcode}" disabled>
                <button class="btn btn-sm" style="--min-height:29px">우편번호 검색</button>
                <input class="input-md col" type="text" disabled value="${arg.address}">
              </div>
              <div class="spacer" style="--height:10px;"></div>
              <div class="col">
                <input class="input-md" type="text" style="--width:100%" value="${arg.detailaddr}">
              </div>
              <div class="spacer" style="--height:10px;"></div>
              <div class="row" style="--align-items:center">화물 영업소 <input class="input-md" type="text"></div>
            </div>
          </td>
        </tr>
        <tr>
          <td>수신동의</td>
          <td>
            <div class="row display-sm" style="--align-items:center">
              <div>제품정보, 안내관련 메일 및 문자 수신허용</div>
              <div class="input-group row" style="--gap: 10px;">
                <input type="radio" name="paymentType" id="paymentType_1" value="true" checked>
                <label for="paymentType_1" style="--font-weight: normal;">수신허용</label>
              </div>
              <div class="input-group row" style="--gap: 10px;">
                <input type="radio" name="paymentType" id="paymentType_2" value="false">
                <label for="paymentType_2" style="--font-weight: normal;">수신거절</label>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>거래명세서 로고</td>
          <td>
            <div class="">${arg.logo}</div>
            <div>
              <input type="file">
            </div>
            <div class="spacer" style="--height:5px;"></div>
            <div class="display-lg">로고 사이즈는 <span class="red">250px(가로)x130px(세로)</span> 를 넘지 않도록 작업해 주세요.</div>
          </td>
        </tr>
      </table>

      <div class="spacer" style="--height:30px;"></div>
      <div class="title-md" style="--font-weight: bold;">
        세금계산서 담당자
      </div>

      <div class="spacer" style="--height:30px;"></div>
      <table>
        <tr>
          <td>담당자명</td>
          <td>${arg.texname}</td>
        </tr>
        <tr>
          <td>담당자 이메일</td>
          <td>
            <div>${arg.taxemail}</div>

            <div class="spacer" style="--height:10px;"></div>
            <div>
              <div>세금계산서는 월합산하여 익월 8일~10일 사이,   현금영수증은 월합산하여 매월 말일 회원정보에 등록된 담당자 이메일로 자동전송 됩니다.</div>
              <div>담당자 이메일주소 변경시 아래로 연락주시기 바랍니다.</div>
            </div>

            <div class="spacer" style="--height:10px;"></div>
            <div class="row">
              <button class="btn btn-md round-sm">문의하기</button>
              <button class="btn btn-md round-sm">02 466 9009 (내선 203, 204, 265)</button>
            </div>
          </td>
        </tr>
        <tr>
          <td>휴대전화</td>
          <td>
            <input class="input-md" type="number" value="${arg.taxphone}">
          </td>
        </tr>
      </table>
      <div class="spacer" style="--height:30px;"></div>
      <div class="title-md" style="--font-weight: bold;">
        현금영수증 발급
      </div>
      <div class="spacer" style="--height:30px;"></div>
      <table>
        <tr>
          <td>
            <div>휴대폰 또는</div>
            <div class="spacer" style="--height:5px;"></div>
            <div>사업자 번호</div>
          </td>
          <td>
            <div class="row" style="--align-items:center">
              <input class="input-md" type="number" value="${arg.receipt}">
              <div class="blue">* 필수입력 항목입니다. 꼭 입력해주세요.</div>
            </div>
          </td>
        </tr>
      </table>

      <div class="spacer" style="--height:20px;"></div>
      <div class="btn-area row" style="--justify-content:center;">
        <button class="btn btn-md round-sm fill-blue body-sm" style="--min-height:45px;--min-width:100px;">수정</button>
        <button class="btn btn-md round-sm fill-red body-sm" style="--min-height:45px;--min-width:100px;">취소</button>
      </div>
    `;

    this.innerHTML = html;
  }
}