import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Header extends PBElement {
  memberCard = {
    menu: [
      {
        title: '장바구니',
        href: 'bucket_list'
      }, {
        title: '주문/배송 조회',
        href: 'my_page?type=C'
      }, {
        title: '1:1 문의상담',
        href: 'my_page?type=D'
      }, {
        title: 'A/S 상담',
        href: 'my_page?type=E'
      }, {
        title: '견적상담',
        href: 'my_page?type=F'
      }, {
        title: '회원정보수정',
        href: 'my_page?type=H'
      }
    ],
    recent : [
      {
        href: "product",
        src: "",
        alt: "img",
        head: "고품격명함1",
        text: "이런저런설명1",
        amount: 100,
        price: 3000
      }, {
        href: "product",
        src: "",
        alt: "img",
        head: "고품격명함2",
        text: "이런저런설명2",
        amount: 200,
        price: 5000
      }
    ]
  };

  modal = {
    type: null,
    A: { el: 'pb-modal-all-product' }
  };

  constructor() {
    super();

    this.onWindowScroll = this.onWindowScroll.bind(this);
    this.onLoginItemClick = this.onLoginItemClick.bind(this);
    this.onNavItemClick = this.onNavItemClick.bind(this);
    this.onModalClick = this.onModalClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);
    this.onNoItemClick = this.onNoItemClick.bind(this);
  }

  async init() {
    await this.getHeaderItem();
  }

  async getHeaderItem(){
    const url = new URL('header/item', location.origin),
    option = {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' }
    };

    await fetch(url,option)
      .then((response) => response.json())
      .then((json) =>{
        this.item = json.item;
      })
      .catch((e) => {
        console.log(e);
      });

  }

  onWindowScroll(ev) {
    //스크롤시 상단 로고 삭제
    let children = [ ...this.children ];

    if (window.scrollY > 120) {
      if (!this.classList.contains('scroll')) {
        this.classList.add('scroll');
      } else {
        children.forEach((el, i, arr) => {
          if (i < 3) {
            el.style.transform = `translateX(-${window.scrollX}px)`;
          }
        });
      }
    } else {
      if (this.classList.contains('scroll')) {
        children.forEach((el, i, arr) => {
          if (i < 3) {
            el.style.transform = `unset`;
          }
        });

        this.classList.remove('scroll');
      }
    }
  }

  onLoginItemClick(ev) {
    const node = ev.currentTarget;

    if (Utils.getCookie('login')) {
      node.parentNode.classList.toggle('expand');
    } else {
      Utils.setCookie('location', `${ev.view.location.pathname}`);
      location.href = 'signin';
    }
  }

  onNavItemClick(ev) {
    const node = ev.currentTarget;

    this.querySelectorAll('.nav .nav-item').forEach((el, i, arr) => {
      if (el == node) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  onSubItemClick(ev) {
    const node = ev.currentTarget;

    location.href = 'category';
  }

  onModalClick(ev) {
    const node = ev.currentTarget,
    modal = this.querySelector('[is="pb-modal"]');

    modal.setAttribute('data-title', node.dataset.title);

    modal.arg.set({
      ...modal.arg.get(),
      data: this.item,
      type: node.dataset.type
    });
  }

  onLogoutClick(ev) {
    Utils.popCookie('login');
    location.reload();
  }

  onLinkClick(ev) {
    const node = ev.currentTarget;

    location.href = this.memberCard[node.dataset.type][node.dataset.index].href;
  }

  onNoItemClick(ev) {
    location.href = "category";
  }

  eventInit() {
    window.addEventListener('scroll', this.onWindowScroll);

    this.querySelectorAll('[data-action="category"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onSubItemClick);
    });

    this.querySelectorAll('.login .item').forEach((el, i, arr) => {
      el.addEventListener('click', this.onLoginItemClick);
    });

    this.querySelectorAll('.nav .nav-item').forEach((el, i, arr) => {
      el.addEventListener('click', this.onNavItemClick);
      el.addEventListener('mouseover', this.onNavItemClick);
      el.addEventListener('mouseleave', (ev) => {
        ev.currentTarget.classList.remove('active');
      });
    });

    this.querySelectorAll('[data-action="modal"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onModalClick);
    });

    this.querySelectorAll('[data-action="logout"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onLogoutClick);
    });

    this.querySelectorAll('[data-action="link"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onLinkClick);
    });

    this.querySelectorAll('.no-item').forEach((el, i, arr) => {
      el.addEventListener('click', this.onNoItemClick);
    });

    this.querySelectorAll('.nav-item .sub-item').forEach((el, i, arr) => {
      el.addEventListener('mouseover', this.onNavItemClick);
      el.addEventListener('mouseleave', (ev) => {
        ev.currentTarget.classList.remove('active');
      });
    });
  }

  destroy() {
    window.removeEventListener('scroll', this.onWindowScroll);

    this.querySelectorAll('[data-action="category"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onSubItemClick);
    });

    this.querySelectorAll('.login .item').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onLoginItemClick);
    });

    this.querySelectorAll('.nav .nav-item').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onNavItemClick);
      el.removeEventListener('mouseover', this.onNavItemClick);
    });

    this.querySelectorAll('[data-action="modal"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onModalClick);
    });

    this.querySelectorAll('[data-action="logout"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onLogoutClick);
    });

    this.querySelectorAll('[data-action="link"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onLinkClick);
    });

    this.querySelectorAll('.no-item').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onNoItemClick);
    });

    this.querySelectorAll('.nav-item .sub-item').forEach((el, i, arr) => {
      el.removeEventListener('mouseover', this.onNavItemClick);
      el.removeEventListener('mouseleave'); // removeEventListener 잘못 사용
    });
  }

  async render() {
    let html = `
      <div class="banner"></div>
      <div class="container">
        <div class="logo">
          <a href="main">
            <img src="../resource/images/logo.png">
          </a>
        </div>
      </div>
      <div class="container">
        <div class="nav row">
          <div class="row">
            <div class="dropdown" data-action="modal" data-title="상품전체보기" data-type="A">
              <div class="dropdown-toggle">
                <span>상품전체보기</span>
                <div class="icon-down-arrow"></div>
              </div>
            </div>
            <div class="divider"></div>
    `;

    this.item.forEach((el, i, arr) => {
      html += `
        <div class="nav-item ${(el.subItem == null) ? 'no-item' : ''}">
          ${el.item}
          <div class="sub-item">
      `;

      el.subItem?.forEach((s_el, i, arr) => {
        html += `<div class="items" data-action="category">${s_el.item}</div>`;
      });

      html += `
          </div>
        </div>
      `;
    });

    html += `
        <div class="input-group">
          <input class="input-sm search" type="text" placeholder="명함을 찾고 계신가요?">
          <div class="icon-search-glass up"></div>
        </div>
      </div>
      <div class="row">
        <div class="login">
          <div class="item">${Utils.getCookie('login') ? 'OOO님' : '로그인'}</div>
          <div class="modal card">
            <div class="row" style="--justify-content: space-between;">
              <div class="body-md blue">OOO님</div>
              <button class="btn btn-sm round-lg" data-action="logout">로그아웃</button>
            </div>

            <div class="spacer" style="--height: 10px;"></div>
            <div class="divider" style="--width: 100%; --height: 1px;"></div>

            <div class="spacer" style="--height: 10px;"></div>
            <div class="body-md">MY페이지</div>

            <div class="spacer" style="--height: 5px;"></div>
            <div class="row display-md" style="--justify-content: space-between;">
    `;

    this.memberCard.menu.forEach((el, i, arr) => {
      html += `<div class="col cursor" style="--cursor: pointer; --flex: 0 105px;" data-action="link" data-type="menu" data-index="${i}">${el.title}</div>`;
    });

    html += `
      </div>

      <div class="spacer" style="--height: 10px;"></div>
      <div class="divider" style="--width: 100%; --height: 1px;"></div>

      <div class="spacer" style="--height: 10px;"></div>
      <div class="display-md" style="--font-weight: 600;">최근 본 상품</div>

      <div class="spacer" style="--height: 5px;"></div>
    `;

    this.memberCard.recent.forEach((el, i, arr) => {
      html += `
        <div class="card" style="--width: 290px;">
          <div class="body">
            <div class="item cursor" data-action="link" data-type="recent" data-index="${i}" data-href="${el.href}" style="--cursor: pointer;">
              <img src="${el.src}" alt="${el.alt}">
              <div class="desc">
                <div class="heading-sm">${el.head}</div>
                <div class="display-md">${el.text}</div>
                <div class="row display-md" style="--font-weight: 600; --gap: 10px;">
                  <div class="blue">${el.amount}매</div>
                  <div>${el.price}~</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    html += `
              </div>
            </div>
          </div>
        </div>
      </div>
      <div is="pb-modal" data-root="pb-header" data-arg="modal"></div>
    `;

    this.innerHTML = html;
  }
}