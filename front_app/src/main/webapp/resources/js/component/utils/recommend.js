import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Recommend extends PBElement {
  tab = [
    {
      type: 'A',
      text: 'NEW순'
    }, {
      type: 'B',
      text: '추천순'
    }, {
      type: 'C',
      text: '인기순'
    }
  ];

  btn = [
    {
      type: 'A',
      text: '명함'
    }, {
      type: 'B',
      text: '스티커'
    }, {
      type: 'C',
      text: '봉투'
    }, {
      type: 'D',
      text: '전단/리플렛'
    }, {
      type: 'E',
      text: '책자'
    }, {
      type: 'F',
      text: '마스터인쇄'
    }
  ];

  constructor() {
    super();

    this.onRecommendClick = this.onRecommendClick.bind(this);
    this.onTabTypeClick = this.onTabTypeClick.bind(this);
    this.onBtnTypeClick = this.onBtnTypeClick.bind(this);
  }

  async init() {
    this.arg = this.setState(this.arg);
    // await this.recommendFetch();
  }

  // async recommendFetch(){
  //   const url = new URL('/utils/recommend', location.origin),
  //   option = {
  //     method: 'GET',
  //     mode: 'cors',
  //     headers: { Accept: 'application/json' }
  //   };

  //   await fetch(url, option)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       if(!Utils.empty(this.arg)){
  //         json.side = this.arg;
  //       }
  //       this.recommend = this.setState(json);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  onRecommendClick(ev) {
    const node = ev.currentTarget,
    item = this.recommend.get('item');

    location.href = `${item[node.dataset.index].href}?index=${node.dataset.index}`;
  }

  onTabTypeClick(ev) {
    const node = ev.currentTarget;

    this.recommend.set('tabType', node.dataset.type);
  }

  onBtnTypeClick(ev) {
    const node = ev.currentTarget;

    this.recommend.set('btnType', node.dataset.type);
  }

  eventInit() {
    this.querySelectorAll('[data-action="recommend"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onRecommendClick);
    });

    this.querySelectorAll('[data-action="tab-type"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onTabTypeClick);
    });

    this.querySelectorAll('[data-action="btn-type"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onBtnTypeClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="recommend"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onRecommendClick);
    });

    this.querySelectorAll('[data-action="tab-type"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onTabTypeClick);
    });

    this.querySelectorAll('[data-action="btn-type"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onBtnTypeClick);
    });
  }

  async render() {
    const arg = this.arg.get();
    
    let html = `<div class="container">`;

    if (!arg.side) {
      html += `<div>`;
    } else {
      html += `<div class="row" style="--justify-content: space-between; --gap: 40px; --wrap: nowrap;">`;
    }

    html += `
      <div class="side-menu">
        <div class="${(arg.side) ? 'heading-lg' : 'title-md'}" style="--font-weight: bold;">이런 상품은 어떠세요? </div>
        <div class="spacer" style="--height: 20px;"></div>
    `;

    if (arg.side) {
      html += `<div class="row" style="--gap: 10px; --align-items: center;">`;

      this.tab.forEach((el, i, arr) => {
        html += `
          <div class="recommend-tab ${(el.type == (arg?.tabType ?? 'A')) ? 'active' : ''}" data-action="tab-type" data-type="${el.type}">
            ${el.text}
          </div>
        `;

        if (i < (arr.length - 1)) {
          html += `<div class="divider" style="--width: 1px; --height: 15px;"></div>`;
        }
      });

      html += `
        </div>
        <div class="spacer" style="--height: 20px;"></div>
        <div class="buttons">
      `;

      this.btn.forEach((el, i, arr) => {
        html += `
          <button class="recommend-btn btn btn-sm display-lg ${(el.type == (arg?.btnType ?? 'A')) ? 'active' : ''}" data-action="btn-type" data-type="${el.type}">
            ${el.text}
          </button>
        `;
      });

      html += `</div>`;
    }

    html += `
      </div>
      <div class="row col" style="--gap: ${(arg.side) ? '20' : '22.5'}px">
    `;

    arg.recommend.forEach((el, i, arr) => {
      html += `
        <div class="product cursor" data-action="recommend" data-index="${i}" style="--cursor: pointer; --product-width: ${(arg.side) ? '260' : '250'}px;">
          <div class="img">
            <img src="${el.src}" alt="${el.alt}">
          </div>
          <div class="content">
            <div class="title">${el.title}</div>
            <div class="text">${el.text}</div>
            <div class="price">
              <div class="color-2">${el.amount}매</div>
              <div>${el.price}~</div>
            </div>
          </div>
        </div>
      `;
    })

    html += `
          </div>
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}