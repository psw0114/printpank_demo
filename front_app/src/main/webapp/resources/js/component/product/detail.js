import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';
import { modal } from '../../data/product.js';

export default class Detail extends PBElement {
  modalArg = modal;

  constructor() {
    super();

    this.onOptionClick = this.onOptionClick.bind(this);
    this.onModalClick = this.onModalClick.bind(this);
  }

  async init() {
    await this.detailFetch();
  }

  async detailFetch() {
    const url = new URL('/product/detail', location.origin),
    option = {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' }
    };

    await fetch(url, option)
      .then((response) => response.json())
      .then((json) => {
        this.detailArg = this.setState(json);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onOptionClick(ev) {
    const node = ev.currentTarget,
    clone1 = this.detailArg.get('option').slice(),
    clone2 = this.detailArg.get('desc').slice();

    clone2[node.dataset.index].active = !this.detailArg.get('desc')[node.dataset.index].active;
    clone1[0].content[node.dataset.index].active = !this.detailArg.get('option')[0].content[node.dataset.index].active;

    this.detailArg.set({
      ...this.detailArg.get(),
      option: clone1,
      desc: clone2
    });
  }

  onModalClick(ev) {
    const node = ev.currentTarget,
    modal = this.querySelector('[is="pb-modal"]');

    modal.setAttribute('data-title', node.dataset.title);

    modal.arg.set({
      ...modal.arg.get(),
      index: node.dataset.index,
      data: this.detailArg.get('desc')[node.dataset.index],
      type: node.dataset.type
    });
  }

  eventInit() {
    this.querySelectorAll('[data-action="option"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onOptionClick);
    });

    this.querySelectorAll('[data-action="modal"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onModalClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="option"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onOptionClick);
    });

    this.querySelectorAll('[data-action="modal"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onModalClick);
    });
  }

  async render() {
    const arg = this.detailArg.get();

    let html = `
      <div class="container">
          <div class="content">
            <div class="spacer" style="--height: 30px;"></div>
            <div class="row">
              <div class="left body-sm">제작물 내용 </div>
              <input class="input-lg col" type="text" placeholder="기본">
            </div>
    `;

    arg.detail.forEach((el, i, arr) => {
      html += `
        <div class="spacer" style="--height: 17px;"></div>
        <div class="row">
          <div class="left body-sm">${el.title}</div>
          <select class="input-lg col">
      `;

      el.option.forEach((o_el, i, arr) => {
        html += `<option value="${o_el.value}">${o_el.text}</option>`;
      });

      html += `
          </select>
        </div>
      `;
    });

    html += `
      <div class="spacer" style="--height: 17px;"></div>
      <div class="row">
        <div class="left body-sm">사이즈</div>
        <select class="input-lg col">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div class="spacer" style="--height: 17px;"></div>
      <div class="row">
        <div class="left body-sm"></div>
        <span class= "body-sm blue">재단사이즈</span>
        <div class= "box col">
          <span>가로</span>
          <input class="input-lg option" type="number" placeholder="가로">
          <span>mm</span>
        </div>
        <div class= "box col">
          <span>가로</span>
          <input class="input-lg option" type="number" placeholder="가로">
          <span>mm</span>
        </div>
      </div>

      <div class="spacer" style="--height: 17px;"></div>
      <div class="row">
        <div class="left body-sm"></div>
        <span class= "body-sm blue">재단사이즈</span>
        <div class= "box col">
          <span>가로</span>
          <input class="input-lg option" type="number" placeholder="가로">
          <span>mm</span>
        </div>
        <div class= "box col">
          <span>가로</span>
          <input class="input-lg option" type="number" placeholder="가로">
          <span>mm</span>
        </div>
      </div>

      <div class="spacer" style="--height: 17px;"></div>
      <div class="row">
        <div class="left body-sm">수량</div>
        <select class="input-lg col">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        x
        <select class="input-lg col">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    `;

    arg.option.forEach((el, i, arr) => {
      html += `
        <div class="spacer" style="--height: 17px;"></div>
        <div class="row">
          <div class="left body-sm">${el.title}</div>
          <div class="option-box col">
      `;

      el.content.forEach((c_el, i, arr) => {
        html += `
          <button class="btn btn-md body-sm ${c_el.active ? 'fill-blue' : ''}" data-action="option" data-index="${i}">
            ${c_el.text}
          </button>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    html += `
      <div class="spacer" style="--height: 17px;"></div>
      <div class="body">
    `;

    arg.desc.forEach((el, i, arr) => {
      html += `
        <div class="option-item col ${el.active ? 'active' : ''}" data-index="${i}">
          <div class="row" style="--align-items: center; --justify-content: space-between;">
            <div class="heading-md">${el.title}</div>
            <button class="icon-close" data-action="option" data-index="${i}"></button>
          </div>
          <div class="spacer" style="--height: 17px;"></div>
          <div class="row con">
            <div class="img">
              <img src="${el.src}">
            </div>
            <div class="desc col">
              <div class="row" style="--align-items: center; --justify-content: space-between;">
                <select class="input-md col">
      `;

      el.flist.forEach((f_el, i, arr) => {
        html += `<option value="${f_el.value}">${f_el.text}</option>`;
      });

      html += `
        </select>
        <select class="input-md col">
      `;

      el.slist.forEach((s_el, i, arr) => {
        html += `<option value="${s_el.value}">${s_el.text}</option>`;
      });

      html += `
                </select>
                <button class="btn btn-md fill-blue round-md label-sm" data-action="modal" data-title="${el.title}" data-type="C" data-index=${i}>파일작업방법</button>
              </div>
              <div class="spacer" style="--height: 12px;"></div>
              <div class="body-sm">${el.desc}</div>
            </div>
          </div>
        </div>
      `;
    });

    html += `
          </div>
        </div>
      </div>
      <div is="pb-modal" data-root="pb-product-detail" data-arg="modalArg"></div>
    `;

    this.innerHTML = html;
  }
}