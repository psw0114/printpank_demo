import PBProxy from './pb_proxy.js';
import Utils from './utils.js';

export default class PBElement extends HTMLDivElement {
  constructor() {
    super();

    this.isLoaded = false;
    this._onPbLinkClick = this._onPbLinkClick.bind(this);
    this._onWindowPopState = this._onWindowPopState.bind(this);
  }

  _onPbLinkClick(ev) {
    const node = ev.currentTarget;

    history.pushState({}, null, node.dataset.pbLink);
  }

  _onWindowPopState(ev) {
    window.dispatchEvent(new CustomEvent('pb-pop-state', { detail: ev }));
  }

  _eventInit() {
    this.querySelectorAll(`[data-pb-link]`).forEach((el, i, arr) => {
      el.addEventListener('click', this._onPbLinkClick);
    });

    window.addEventListener('popstate', this._onWindowPopState);
  }

  _destroy() {
    this.querySelectorAll(`[data-pb-link]`).forEach((el, i, arr) => {
      el.removeEventListener('click', this._onPbLinkClick);
    });

    window.removeEventListener('popstate', this._onWindowPopState);
  }

  async init() {}

  destroy() {}

  eventInit() {}

  async render() {}

  argInit() {
    this.arg = document.querySelector(`div[is="${this.dataset.root}"]`)?.[this.dataset.arg];
  }

  setState(arg) {
    return new PBProxy(arg, this);
  }

  getParams() {
    return new URLSearchParams(location.search);
  }

  async connectedCallback() {
    this.argInit();
    await this.init();
    await this.render();
    this.eventInit();

    this.isLoaded = true;
  }

  disconnectedCallback() {
    if (this.isLoaded) {
      this.destroy();
    }
  }

  adoptedCallback() { }

  async attributeChangedCallback(target, oldValue, newValue) {
    if (this.isLoaded) {
      this.updateAttribute(target, oldValue, newValue);
      await this.render();
      this.eventInit();
    }
  }

  updateAttribute(target, oldValue, newValue) {}

  static get observedAttributes() { return []; }
}