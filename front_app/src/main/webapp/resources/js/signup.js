import Component from './component/signup/index.js';
import PBElement from './utils/pb_element.js';

class SignUp extends PBElement {
  constructor() {
    super();

    new Component();
  }

  async init() {
    await this.termsFetch();
  }

  async termsFetch() {
    const url = new URL('/signup/term', location.origin),
    option = {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' }
    };

    await fetch(url, option)
      .then((response) => response.json())
      .then((json) => {
        this.termArg = this.setState(json);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async render() {
    let html = `
      <div class="spacer" style="--height: 100px;"></div>
      <div is="pb-title" data-title="회원가입" data-size="lg" data-divider="true"></div>

      <div class="spacer" style="--height: 213px;"></div>
      <div is="pb-signup-all-agree" data-root="pb-signup" data-arg="termArg"></div>

      <div class="spacer" style="--height: 32px;"></div>
      <div is="pb-signup-term" data-root="pb-signup" data-arg="termArg"></div>

      <div class="spacer" style="--height: 150px;"></div>
      <div is="pb-signup-button" data-root="pb-signup" data-arg="termArg"></div>

      <div class="spacer" style="--height: 200px;"></div>
    `;

    this.innerHTML = html;
  }
}

customElements.define('pb-signup', SignUp, { extends: 'div' });