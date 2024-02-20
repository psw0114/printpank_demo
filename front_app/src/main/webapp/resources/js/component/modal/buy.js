import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Buy extends PBElement {
  constructor() {
    super();

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onConfirmClick = this.onConfirmClick.bind(this);
    this.onManageClick = this.onManageClick.bind(this);

    this.classList.add('modal-body');
    this.style.setProperty('--height', '600px');
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
    memo = this.querySelector('[name="memo"]'),
    detail = { ...this.arg.get() };

    detail.data.memo = memo.value;

    this.arg.set({
      ...this.arg.get(),
      type: null,
      index: null,
      data: null
    });

    root.dispatchEvent(new CustomEvent('option-detail-confirm', { detail: detail }));
  }

  onManageClick(ev) {
    this.dispatchEvent(new CustomEvent('modal-manage', { detail: ev }));
  }

  eventInit() {
    this.querySelectorAll('[data-action="close"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onCloseClick);
    });

    this.querySelectorAll('[data-action="confirm"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onConfirmClick);
    });

    this.querySelectorAll('[data-action="manage"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onManageClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="close"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onCloseClick);
    });

    this.querySelectorAll('[data-action="confirm"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onConfirmClick);
    });

    this.querySelectorAll('[data-action="manage"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onManageClick);
    });
  }

  async render() {
    const data = this.arg.get('data');

    let html = `
      <div class="spacer" style="--height: 17px;"></div>
      <div class="option-detail">
        <div class="table">
          <table style="--back-color: var(--back-3);">
            <tr>
              <td>품목</td>
              <td>제작물 상호</td>
              <td>종류</td>
              <td>수량(건)</td>
              <td>금액</td>
            </tr>
            <tr>
              <td>고품격명함</td>
              <td>${data.pdname}</td>
              <td>${data.optionlist}</td>
              <td>${Utils.numberFormat(data.quantity)}(${Utils.numberFormat(data.case)})</td>
              <td>${Utils.numberFormat(data.price)}</td>
            </tr>
          </table>
        </div>
        <div class="spacer" style="--height: 17px;"></div>
        <div class="file-upload">
          <div class="display-lg">파일업로드<span class="display-sm red"> *필수</span></div>
          <div class="spacer" style="--height: 10px;"></div>
          <div class="divider"></div>
          <div class="spacer" style="--height: 10px;"></div>
          <div class="display-md">주문하신 상품의 인쇄작업에 필요한 파일을 업로드 해 주시면 됩니다.</div>
          <div class="spacer" style="--height: 10px;"></div>
          <label for="file">
          </label>
          <div class="upload-area body-md" data-action="upload">
            <p>파일은 1개만 등록이 가능합니다. 여러개의 파일인 경우 압축파일(Zip)로 등록해주세요.</p><p>업로드 파일용량은 1,024MB 미만으로 작업해 주시기 바랍니다.</p>
          </div>
          <div class="spacer" style="--height: 10px;"></div>
          <div class="row" style="--justify-content: space-between;">
            <input type="file" name="file" id="file">
            <div class="input-group">
              <input type="checkbox" name="check" id="check" autocomplete="off" />
              <label for="check">파일없이 주문하기</label>
            </div>
          </div>
        </div>
        <div class="spacer" style="--height: 17px;"></div>
        <div class="memo">
          <div class="display-lg">요청사항 메모</div>
          <div class="spacer" style="--height: 10px;"></div>
          <textarea class="text-area display-md" name="memo" data-action="memo" placeholder="납품일 관련 요청사항이나 인쇄시 주의사항이 있는 경우 필히 메모를 남겨주세요.">${data.memo}</textarea>
        </div>
        <div class="spacer" style="--height: 17px;"></div>
      </div>
      <div class="spacer" style="--height: 25px;"></div>
      <div>
        <div class="row body-md" style="--justify-content: center;">
          <button class="btn btn-lg round-md outline-blue" data-action="confirm">수정</button>
          <!-- <button class="btn btn-lg round-md fill-blue" data-action="buy">구매</button> -->
          <button class="btn btn-lg round-md outline-red" data-action="close">닫기</button>
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}