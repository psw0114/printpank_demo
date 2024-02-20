import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class FileUpload extends PBElement {
  constructor() {
    super();

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onConfirmClick = this.onConfirmClick.bind(this);
    this.onUploadDrop = this.onUploadDrop.bind(this);
    this.onUploadDragOver = this.onUploadDragOver.bind(this);

    this.classList.add('modal-body');
    this.style.setProperty('--height', '300px');
    this.setAttribute('id', 'modal-content');
  }

  argInit() {
    this.arg = document.querySelector(`div[is="${this.dataset.root}"] div[is="pb-modal"]`)?.arg
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
    file = this.querySelector('[name="file"]'),
    detail = { ...this.arg.get() };

    detail.data.file = file.files;

    this.arg.set({
      ...this.arg.get(),
      type: null,
      index: null,
      data: null
    });

    root.dispatchEvent(new CustomEvent('file-upload-confirm', { detail: detail }));
  }

  onUploadDrop(ev) {
    ev.preventDefault();

    const file = this.querySelector('[name="file"]');

    file.files = ev.dataTransfer.files;
  }

  onUploadDragOver(ev) {
    ev.preventDefault();

    ev.dataTransfer.dropEffect = "move";
  }

  eventInit() {
    this.querySelectorAll('[data-action="close"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onCloseClick);
    });

    this.querySelectorAll('[data-action="confirm"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onConfirmClick);
    });

    this.querySelectorAll('[data-action="upload"]').forEach((el, i, arr) => {
      el.addEventListener('drop', this.onUploadDrop);
      el.addEventListener('dragover', this.onUploadDragOver);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="close"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onCloseClick);
    });

    this.querySelectorAll('[data-action="confirm"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onConfirmClick);
    });

    this.querySelectorAll('[data-action="upload"]').forEach((el, i, arr) => {
      el.removeEventListener('drop', this.onUploadDrop);
      el.removeEventListener('dragover', this.onUploadDragOver);
    });
  }

  async render() {
    let html = `
      <div class="spacer" style="--height: 17px;"></div>
      <div class="upload">
        <div class="file-upload">
          <div class="display-lg">파일업로드<span class="display-sm red"> *필수</span></div>

          <div class="spacer" style="--height: 10px;"></div>
          <div class="divider"></div>

          <div class="spacer" style="--height: 10px;"></div>
          <div class="display-md">주문하신 상품의 인쇄작업에 필요한 파일을 업로드 해 주시면 됩니다.</div>

          <div class="spacer" style="--height: 10px;"></div>
          <label for="file"></label>
          <div class="upload-area body-md" data-action="upload">
            <p>파일은 1개만 등록이 가능합니다. 여러개의 파일인 경우 압축파일(Zip)로 등록해주세요.</p><p>업로드 파일용량은 1,024MB 미만으로 작업해 주시기 바랍니다.</p>
          </div>

          <div class="spacer" style="--height: 10px;"></div>
          <div class="row" style="--justify-content: space-between;">
            <input type="file" name="file" id="file" />
            <div class="input-group">
              <input type="checkbox" name="check" id="check" autocomplete="off" />
              <label for="check">파일없이 주문하기</label>
            </div>
          </div>
        </div>
      </div>

      <div class="spacer" style="--height: 25px;"></div>
      <div>
        <div class="row body-md" style="--justify-content: center;">
          <button class="btn btn-lg round-md fill-blue" data-action="confirm">변경</button>
          <button class="btn btn-lg round-md outline-red" data-action="close">닫기</button>
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}