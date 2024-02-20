import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';
import { event } from '../../data/event.js';

export default class Product extends PBElement {
  state = this.setState({
    tab: this.getParams().get('tab') ?? 'A',
    ...event
  });

  constructor() {
    super();

    this.onPbPopState = this.onPbPopState.bind(this);
    this.onTabclick = this.onTabclick.bind(this);
  }

  onPbPopState(ev) {
    this.state.set('tab', this.getParams().get('tab') ?? 'A');
  }

  onTabclick(ev) {
    const node = ev.currentTarget;

    this.state.set('tab', node.dataset.tab);
  }

  eventInit() {
    window.addEventListener('pb-pop-state', this.onPbPopState);

    this.querySelectorAll('[data-action="tab"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onTabclick);
    });

    this._eventInit();
  }

  destroy() {
    window.removeEventListener('pb-pop-state', this.onPbPopState);

    this.querySelectorAll('[data-action="tab"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onTabclick);
    });

    this._destroy();
  }

  async render() {
    const state = this.state.get();

    let html = `
      <div class="container">
        <div class="tab heading-md" style="--height: 60px;">
    `;

    for (const i in state) {
      if (i != 'tab') {
        const el = state[i],
        params = this.getParams();

        params.set('tab', i);

        html += `<div class="tabs ${(state.tab == i) ? 'active' : ''}" data-action="tab" data-tab="${i}" data-pb-link="${location.pathname}?${params}">${el.title}</div>`;
      }
    }

    html += `
      </div>

      <div class="spacer" style="--height: 40px;"></div>
      <div class="row col" style="--gap: 25px;">
    `;

    state[state.tab].event.forEach((el, i, arr) => {
      html += `
        <div class="product cursor" data-action="event" data-index="${i}" style="--cursor: pointer; --product-width: 430px;">
          <div class="img">
            <img src="${el.src}" alt="${el.alt}">
          </div>
          <div class="content">
            <div class="title heading-lg">${el.title}</div>
            <div class="text">${el.date}</div>
          </div>
        </div>
      `;
    });

    html += `</div>`;

    this.innerHTML = html;
  }
}