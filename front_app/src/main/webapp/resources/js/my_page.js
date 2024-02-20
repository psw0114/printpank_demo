import Component from './component/my_page/index.js';
import PBElement from './utils/pb_element.js';
import Utils from './utils/utils.js';
import { sideMenu } from './data/my_page.js';

class MyPage extends PBElement {
  state = this.setState({
    type: this.getParams().get('type') ?? 'A',
    subType: this.getParams().get('subType'),
    sideMenu: sideMenu
  });

  constructor() {
    super();

    new Component();

    this.onPbPopState = this.onPbPopState.bind(this);
  }

  onPbPopState(ev) {
    this.state.set('type', this.getParams().get('type') ?? 'A');
    this.state.set('subType', this.getParams().get('subType'));
  }

  eventInit() {
    window.addEventListener('pb-pop-state', this.onPbPopState);

    this._eventInit();
  }

  destroy() {
    window.removeEventListener('pb-pop-state', this.onPbPopState);

    this._destroy();
  }

  async render() {
    const state = this.state.get(),
    sideMenu = state.sideMenu.filter((el) => el.type == state.type)[0],
    subMenu = sideMenu.subType?.filter((el) => el.type == state.subType)[0];

    let html = `
      <div class="spacer" style="--height: 100px;"></div>
      <div id="my-page">
        <div class="container">
          <div class="row" style="--gap: 50px;">
            <div is="pb-side-menu" data-root="pb-my-page" data-arg="state" data-title="마이페이지" data-type="${state.type}"></div>
            <div class="col" is="${Utils.empty(subMenu) ? sideMenu.el : subMenu.el}" data-root="pb-my-page">
            </div>
          </div>
        </div>
      </div>

      <div class="spacer" style="--height: 80px;"></div>
      <div is="pb-recommend" data-root="pb-my-page"></div>

      <div class="spacer" style="--height: 80px;"></div>
      <div is="pb-news" data-root="pb-my-page"></div>

      <div class="spacer" style="--height: 100px;"></div>
    `;

    this.innerHTML = html;
  }
}

customElements.define('pb-my-page', MyPage, { extends: 'div' });