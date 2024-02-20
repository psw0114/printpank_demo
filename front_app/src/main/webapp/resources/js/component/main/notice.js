import PBElement from '../../utils/pb_element.js';

export default class Notice extends PBElement {
  constructor() {
    super();

    this.onBannerClick = this.onBannerClick.bind(this);
    this.onMoreClick = this.onMoreClick.bind(this);
    this.onNoticeClick = this.onNoticeClick.bind(this);
  }

  async init() {
    this.arg = this.setState(this.arg);
  }

  onBannerClick(ev) {
    const node = ev.currentTarget;
  }

  onMoreClick(ev) {
    const node = ev.currentTarget;

    location.href = 'customer';
  }

  onNoticeClick(ev) {
    const node = ev.currentTarget,
    notice = this.arg.get('notice');


    location.href = `${notice[node.dataset.index].href}?index=${node.dataset.index}`;
  }

  eventInit() {
    this.querySelectorAll('[data-action="banner"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onBannerClick);
    });

    this.querySelectorAll('[data-action="more"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onMoreClick);
    });

    this.querySelectorAll('[data-action="notice"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onNoticeClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="banner"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onBannerClick);
    });

    this.querySelectorAll('[data-action="more"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onMoreClick);
    });

    this.querySelectorAll('[data-action="notice"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onNoticeClick);
    });
  }

  async render() {
    // const arg = this.noticeArg.get();
    const arg = this.arg.get();
    let html = `
      <div class="container">
        <div class="row" style="--justify-content: space-between;">
          <div class="banner col" data-action="banner" data-href="${arg.banner[0].href}">
            <img src="${arg.banner[0].src}" alt="${arg.banner[0].alt}"/>
          </div>
    `;

    html += `
      <div class="card" style="--width: 290px;">
        <div class="row" style="--align-items: center; --justify-content: space-between;">
          <div class="heading-md blue">공지사항</div>
          <button class="icon-plus" data-action="more"></button>
        </div>
        <div class="spacer" style="--height: 7px;"></div>
        <div class="divider" style="--color: var(--color-2);"></div>
        <div class="spacer" style="--height: 10px;"></div>
        <div class="body" style="--gap: 8px;">
    `;

    arg.notice.forEach((el, i, arr) => {
      html += `
        <div class="item" style="--justify-content: space-between;" data-action="notice" data-index="${i}">
          <div class="row cursor" style="--gap: 5px; --cursor: pointer;">
            <div class="label-sm blue">[${el.type}]</div>
            <div class="label-sm">${el.title}</div>
          </div>
          <div class="label-sm">${el.date}</div>
        </div>
      `;
    });

    html += `
            </div>
          </div>
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}