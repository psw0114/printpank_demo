import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Footer extends PBElement {
  // item = [
  //   {
  //     type: 'A',
  //     title: '회사소개',
  //     href: 'signin'
  //   }, {
  //     type: 'B',
  //     title: '개인정보취급방침',
  //     href: 'customer'
  //   }, {
  //     type: 'C',
  //     title: '찾아오시는길',
  //     href: 'customer'
  //   }, {
  //     type: 'D',
  //     title: '이용약관',
  //     href: 'customer'
  //   }, {
  //     type: 'E',
  //     title: '고객센터',
  //     href: 'customer'
  //   }
  // ];

  // sideImage = {
  //   href: "main",
  //   src: "/resource/images/column_logo.gif",
  //   alt: "img"
  // };

  constructor() {
    super();

    this.onFooterItemClick = this.onFooterItemClick.bind(this);
  }

  async init() {
    await this.getFooterItem();
  }

  async getFooterItem() {
    const url = new URL('footer/item', location.origin),
    option = {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' }
    };

    await fetch(url,option)
      .then((response) => response.json())
      .then((json) =>{
        this.arg = this.setState(json);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onFooterItemClick(ev) {
    const node = ev.currentTarget,
    arg = this.arg.get();

    location.href = arg.item[node.dataset.index].href;
  }

  eventInit() {
    this.querySelectorAll('[data-action="footer-item"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onFooterItemClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="footer-item"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onFooterItemClick);
    });
  }

  async render() {
    const type = this.getAttribute('data-type'),
    arg = this.arg.get();

    let html = `
      <div class="container">
        <div class="row">
    `;

    arg.item.forEach((el, i, arr) => {
      html += `<div class="footer-item ${(el.type == type) ? 'active' : ''}" data-action="footer-item" data-index="${i}">${el.title}</div>`;

      if (i < (arr.length - 1)) {
        html += `<div class="divider"></div>`;
      }
    });

    html += `
        </div>
      </div>
      <div class="divider"></div>
      <div class="container">
        <div class="row">
          <div>
            <div>프린트뱅크 고객센터</div>
            <div>02-466-9009</div>
            <div>
              <div>평일: 09:00 ~ 20:00 / 점심12:00 ~ 13:00</div>
              <div>토 / 일 / 공휴일 휴무</div>
              <div>E-mail : tex@printbank.co.kr</div>
            </div>
          </div>
          <div>
            <div>(주)프린트뱅크</div>
            <div>본사 : 서울특별시 중구 마른내로 166 신승빌딩4층</div>
            <div>대표이사 : 윤준영, 전서연 &nbsp;  개인정보 관리 책임자 : 김인흠</div>
            <div>사업자등록번호 206-81-9242 &nbsp; &nbsp; &nbsp;  통신판매업신고번호 2021-서울중구-2446 &nbsp; &nbsp; &nbsp;   Copyright ⓒPRINTBANK. All Rights Reserved </div>
          </div>
        </div>
      </div>
      <div class="container">
        <img src ="${arg.sideImage.src}" alt ="${arg.sideImage.alt}">
      </div>
    `;

    this.innerHTML = html;
  }
}