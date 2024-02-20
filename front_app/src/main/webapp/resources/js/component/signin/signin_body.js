import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class SginInBody extends PBElement {
  constructor() {
    super();

    this.onLoginBtnClick = this.onLoginBtnClick.bind(this);
    this.onSNSClick = this.onSNSClick.bind(this);
    this.onSignUpClick = this.onSignUpClick.bind(this);
  }

  onLoginBtnClick(ev) {
    Utils.setCookie('login', true);

    location.href = Utils.getCookie('location');

    Utils.popCookie('location');
  }

  onSNSClick(ev) { }

  onSignUpClick(ev) {
    location.href = 'signup';
  }

  eventInit() {
    this.querySelectorAll('[data-action="login"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onLoginBtnClick);
    });

    this.querySelectorAll('[data-action="signup"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onSignUpClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="login"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onLoginBtnClick);
    });

    this.querySelectorAll('[data-action="signup"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onSignUpClick);
    });
  }

  async render() {
    let html = `
      <div class="container">
        <div class="login-box">
          <input type="text" name="" class="input-lg" value="" style="--width: 100%;" data-user="" placeholder="아이디">

          <div class="spacer" style="--height: 25px;"></div>
          <input type="password" name="" class="pw-box input-lg" style="--width: 100%;" value="" data-user="" placeholder="비밀번호">

          <div class="spacer" style="--height: 25px;"></div>
          <div class="input-group">
            <input type="checkbox" name="remember" id="remember" autocomplete="off" />
            <label for="remember">아이디 저장</label>
          </div>

          <div class="spacer" style="--height: 30px;"></div>
          <button class="btn btn-lg round-md fill-blue title-md" style="--min-width: 100%;" data-action="login" data-type="A">로그인</button>

          <div class="spacer" style="--height: 30px;"></div>
          <div class="row" style="--justify-content: space-between; --gap: 0px;">
            <div class="icon-google-bar cursor" style="--cursor: pointer;" data-action="login" data-type="B"></div>
            <div class="icon-kakao-bar cursor" style="--cursor: pointer;" data-action="login" data-type="C"></div>
            <div class="icon-naver-bar cursor" style="--cursor: pointer;" data-action="login" data-type="D"></div>
          </div>

          <div class="spacer" style="--height: 40px;"></div>
          <div class="memeber-box row body-sm" style="--justify-content: center;">
            <div class="idFind cursor" style="--cursor: pointer;">아이디찾기</div>
            <div class="divider" style="--width: 1px; --height: 20px;"></div>
            <div class="pwFind cursor" style="--cursor: pointer;">비밀번호 찾기</div>
            <div class="divider" style="--width: 1px; --height: 20px;"></div>
            <div class="membership cursor" style="--cursor: pointer;" data-action="signup">회원가입</div>
          </div>
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}