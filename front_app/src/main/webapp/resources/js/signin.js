import Component from './component/signin/index.js';
import PBElement from './utils/pb_element.js';
import Utils from './utils/utils.js';

class SignIn extends PBElement {
  constructor() {
    super();

    new Component();
  }

  eventInit() { }

  async render() {
    let html = `
      <div class="spacer" style="--height: 50px;"></div>
      <div class="container">
        <div class="logo">
          <a href="main">
            <img src="../resource/images/logo.png">
          </a>
        </div>
      </div>

      <div class="spacer" style="--height: 50px;"></div>
      <div is="pb-signin-body" data-root="pb-signin"></div>

      <div class="spacer" style="--height: 100px;"></div>
      <div is="pb-submenu" data-root="pb-signin"></div>

      <div class="spacer" style="--height: 100px;"></div>
    `;

    this.innerHTML = html;
  }
}

customElements.define('pb-signin', SignIn, { extends: 'div' });