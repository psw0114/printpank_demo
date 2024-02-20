import PBElement from "../../utils/pb_element.js";
import Utils from "../../utils/utils.js";

export default class SideMenu extends PBElement {
  constructor() {
    super();

    this.onSideMenuClick = this.onSideMenuClick.bind(this);
    this.onSubMenuClick = this.onSubMenuClick.bind(this);
  }

  onSideMenuClick(ev) {
    const node = ev.currentTarget;

    if (!Utils.empty(node.dataset.submenu)) {
      this.querySelectorAll('[data-action="sideMenu"]').forEach((el, i, arr) => {
        if( el == node) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    } else {
      this.arg.set('type', node.dataset.type);
    }
  }

  onSubMenuClick(ev) {
    const node = ev.currentTarget;

    this.arg.set({
      ...this.arg.get(),
      type: node.dataset.type,
      subType: node.dataset.subType
    });
  }

  eventInit() {
    this.querySelectorAll('[data-action="sideMenu"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onSideMenuClick);
    });

    this.querySelectorAll('[data-action="subMenu"]').forEach((el, i, arr)=>{
      el.addEventListener('click', this.onSubMenuClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="sideMenu"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onSideMenuClick);
    });

    this.querySelectorAll('[data-action="subMenu"]').forEach((el, i, arr)=>{
      el.removeEventListener('click', this.onSubMenuClick);
    });
  }

  async render() {
    const arg = this.arg.get();

    let html = `
      <div class="side-top">
        <div class="side-title title-lg">${this.dataset.title}</div>
        <div class="cate">
    `;

    arg.sideMenu.forEach((el, i, arr) => {
      const params = this.getParams();

      params.set('type', el.type);
      params.delete('subType');

      html += `
        <div class="item heading-lg ${(arg.type == el.type) ? 'active' : ''}" style="--font-weight: normal;" data-action="sideMenu" data-type="${el.type}" ${Utils.empty(el.subType) ? `data-pb-link="${location.pathname}?${params}"` : `data-submenu="true"`}>
          ${el.title}
        </div>
      `;

      if (!Utils.empty(el.subType)) {
        html += `<div class="side-submenu body-sm">`;

        el.subType.forEach((st, i, arr) => {
          params.set('subType', st.type);

          html += `
            <div class="sub-items ${(arg.subType == st.type) ? 'active' : ''}" data-action="subMenu" data-type="${el.type}" data-sub-type="${st.type}" data-pb-link="${location.pathname}?${params}">
              ㄴ ${st.title}
            </div>
          `;
        });

        html += `</div>`;
      }
    });

    html += `
        </div>
      </div>
      <div class="side-bottom">
        <div class="string heading-lg">프린트뱅크 고객센터</div>
        <div class="number title-lg blue">02-466-9009</div>
        <div class="side-text display-sm">
          <div>평일: 09:00 ~ 20:00 / 점심12:00 ~ 13:00</div>
          <div>토 / 일 / 공휴일 휴무</div>
        </div>
        <div class="store-info">
          <div class="info-title heading-lg" style="--font-weight: normal;">오프라인 매장안내</div>
          <div class="info-title body-sm">매장별 위치/ 연락처를 확인하세요</div>
          <div class="place body-lg" style="--font-weight: noraml;">프린트뱅크 캠퍼스</div>
          <div class="place body-lg" style="--font-weight: noraml;">프린트뱅크 파주센터</div>
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}