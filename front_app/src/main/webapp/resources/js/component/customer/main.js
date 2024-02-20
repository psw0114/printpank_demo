import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';
import { faq, notice, qna, download, sideMenu } from '../../data/customer.js';

export default class Main extends PBElement {

  state = this.setState({
    type: this.getParams().get('type') ?? 'A',
    subType: this.getParams().get('subType'),
    sideMenu: sideMenu
  });

  constructor() {
    super();

    this.onPbPopState = this.onPbPopState.bind(this);
  }

  async init() {
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
      <div class="container">
        <div class="row" style="--gap: 50px;">
          <div is="pb-side-menu" data-root="pb-customer-main" data-arg="state" data-title="고객센터" data-type="${state.type}"></div>
          <div class="col" is="${Utils.empty(subMenu) ? sideMenu.el : subMenu.el}" id="customer-view" data-root="pb-customer-main" data-arg="${Utils.empty(subMenu) ? sideMenu.arg : subMenu.arg}"></div>
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}