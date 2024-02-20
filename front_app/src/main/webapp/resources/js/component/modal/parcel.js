import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Parcel extends PBElement {
  constructor() {
    super();

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onConfirmClick = this.onConfirmClick.bind(this);

    this.classList.add('modal-body');
    this.style.setProperty('--height', '650px');
    this.setAttribute('id', 'modal-content');
  }

  argInit() {
    this.arg = document.querySelector(`div[is="${this.dataset.root}"] div[is="pb-modal"]`)?.arg;
  }

  onCloseClick(ev) {
    this.arg.set({
      ...this.arg.get(),
      type: null,
      index: null,
      data: null
    });
  }

  onConfirmClick(ev) {
    const root = document.querySelector(`div[is="${this.dataset.root}"]`),
    detail = true;

    this.arg.set({
      ...this.arg.get(),
      type: null,
      index: null,
      data: null
    });

    root.dispatchEvent(new CustomEvent('parcel-confirm', { detail: detail }));
  }

  eventInit() {
    this.querySelectorAll('[data-action="close"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onCloseClick);
    });

    this.querySelectorAll('[data-action="confirm"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onConfirmClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="close"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onCloseClick);
    });

    this.querySelectorAll('[data-action="confirm"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onConfirmClick);
    });
  }

  async render() {
    const data = this.arg.get('data');

    let html = `
      <div class="spacer" style="--height: 17px;"></div>
      <div class="del-input">
        <table>
          <tr class="thead">
            <td class="divide body-lg colr" style="--font-weight: normal;">
              <div>배송방법</div>
              <div>(인쇄만 해당)</div>
            </td>
            <td class="col" colspan=5>
              <div class="write-area">
                <div class="input-group row" style="--gap: 10px;">
                  <div>
                    <input type="radio" name="type" id="type_1" value="선불">
                    <label class="body-lg" for="type_1" style="--font-weight: normal;">
                      선물택배
                    </label>
                  </div>
                  <div>
                    <input type="radio" name="type" id="type_2" value="착불">
                    <label class="body-lg" for="type_2" style="--font-weight: normal;">
                      착불택배
                    </label>
                  </div>
                  <div>
                    <input type="radio" name="type" id="type_3" value="파주">
                    <label class="body-lg" for="type_3" style="--font-weight: normal;">
                      방문(파주)
                    </label>
                  </div>
                  <div>
                    <input type="radio" name="type" id="type_4" value="충무로">
                    <label class="body-lg" for="type_4" style="--font-weight: normal;">
                      방문(충무로)
                    </label>
                  </div>
                  <div>
                    <input type="radio" name="type" id="type_5" value="퀵파주">
                    <label class="body-lg" for="type_5" style="--font-weight: normal;">
                      퀵착불(파주출고)
                    </label>
                  </div>
                  <div>
                    <input type="radio" name="type" id="type_6" value="퀵충무로">
                    <label class="body-lg" for="type_6" style="--font-weight: normal;">
                      퀵착불(충무로출고)
                    </label>
                  </div>
                  <div>
                    <input type="radio" name="type" id="type_7" value="다중">
                    <label class="body-lg" for="type_7" style="--font-weight: normal;">
                      택배다중발송(엑셀)-후정산
                    </label>
                  </div>
                </div>
                <div class="spacer" style="--height: 40px;"></div>
                <div class="body-lg" style="--font-weight: normal;">
                  - 선불택배인 경우 <span class="blue">제주/도서/산간</span>인 경우 <span class="red">배송료가 추가 정산</span>됩니다.
                </div>
                <div class="body-lg" style="--font-weight: normal;">
                  - 배송방법 변경은 인쇄물만 해당됩니다. (자석스티커, 쇼핑백, 실사출력물 제외)
                </div>
                <div class="body-lg" style="--font-weight: bold;">
                  - 배송방법을 변경하더라도 기본배송(<span class="red">실사출력 착불, 쇼핑백 착불</span>, <span class="blue">자석스티커 선불</span>)이 우선적용됩니다.
                </div>
              </div>
            </td>
          </tr>
          <tr class="thead">
            <td class="divide body-lg colr" style="--font-weight: normal;">
              <div>보내는 사람</div>
            </td>
            <td class="col" colspan=5>
              <div class="write-area">
                <div class="input-group row" style="--gap: 10px;">
                  <input type="radio" name="who" id="who" value="user-name">
                  <label class="body-lg" for="who" style="--font-weight: normal;">
                    최승현
                  </label>
                  <input type="radio" name="who" id="who" value="user-company">
                  <label class="body-lg" for="who" style="--font-weight: normal;">
                    (주)프린트뱅크
                  </label>
                </div>
              </div>
            </td>
          </tr>
          <tr class="thead">
            <td class="divide body-lg colr" style="--font-weight: normal;">
              <div>배송지 선택</div>
            </td>
            <td class="col" colspan=5>
              <div class="write-area">
                <div class="input-group row" style="--gap: 10px;">
                  <input type="radio" name="place" id="place" value="default">
                  <label class="body-lg" for="place" style="--font-weight: normal;">
                    기본주소
                  </label>
                  <input type="radio" name="place" id="place" value="new-place">
                  <label class="body-lg" for="place" style="--font-weight: normal;">
                    새로입력
                  </label>
                  <input type="radio" name="place" id="place" value="select-place">
                  <label class="body-lg" for="place" style="--font-weight: normal;">
                    배송지에서 선택
                  </label>
                  <input type="radio" name="place" id="place" value="recent-place">
                  <label class="body-lg" for="place" style="--font-weight: normal;">
                    최근배송지(2년이내)
                  </label>
                </div>
              </div>
            </td>
          </tr>
          <tr class="thead">
            <td class="num body-lg colr" style="--font-weight: normal;">
              <div>받는사람</div>
            </td>
            <td class="divide">
              <input class="input-sm" type="text" name="name" style="--width: 90%;">
            </td>
            <td class="num body-lg colr" style="--font-weight: normal;">
              <div>휴대번호</div>
            </td>
            <td class="divide">
              <div class="row" style="--gap: 10px; --align-items: center;">
                <input class="input-sm" type="text" name="name" style="--width: 50px;">
                <div>-</div>
                <input class="input-sm" type="text" name="name" style="--width: 70px;">
                <div>-</div>
                <input class="input-sm" type="text" name="name" style="--width: 70px;">
              </div>
            </td>
            <td class="num body-lg colr" style="--font-weight: normal;">
              <div>유선전화</div>
            </td>
            <td class="divide">
              <div class="row" style="--gap: 10px; --align-items: center;">
                <input class="input-sm" type="text" name="name" style="--width: 50px;">
                <div>-</div>
                <input class="input-sm" type="text" name="name" style="--width: 70px;">
                <div>-</div>
                <input class="input-sm" type="text" name="name" style="--width: 70px;">
              </div>
            </td>
          </tr>
          <tr class="thead">
            <td class="divide body-lg colr" style="--font-weight: normal;">
              <div>배송주소</div>
            </td>
            <td class="col" colspan=5>
              <div class="write-area">
                <div class="row" style="--gap: 10px;">
                  <input class="input-sm" style="--width: 100px;" type="text" name="addr-num" placeholder="우편번호" disabled>
                  <button class="btn btn-sm" style="--min-height: 30px; --min-width: 120px;">
                    우변번호 검색
                  </button>
                  <input class="input-sm col" type="text" name="addr" placeholder="우편번호" disabled>
                </div>
                <div class="spacer" style="--height: 10px;"></div>
                <div class="col">
                  <input class="input-sm" style="--width: 100%;" type="text" name="detail-addr" placeholder="상세주소">
                </div>
                <div class="input-group body-lg row">
                  <input type="checkbox" name="addr-store" id="addr-store" autocomplete="off" />
                  <label for="addr-store">
                    <span class="blue">배송지관리</span> 주소 <span class="red">저장시 선택</span>해주세요.
                  </label>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="spacer" style="--height: 25px;"></div>
      <div>
        <div class="row body-md" style="--justify-content: center;">
          <button class="btn btn-lg round-md fill-blue" data-action="confirm">저장</button>
          <button class="btn btn-lg round-md outline-red" data-action="close">닫기</button>
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}