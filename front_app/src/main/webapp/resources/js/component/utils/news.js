import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class News extends PBElement {
  constructor() {
    super();

    this.onNewsClick = this.onNewsClick.bind(this);
    this.onAllClick = this.onAllClick.bind(this);
  }

  async init() {
    this.arg = this.setState(this.arg);
    // await this.newsFetch();
  }

  // async newsFetch() {
  //   const url = new URL('/utils/news', location.origin),
  //   option = {
  //     method: 'GET',
  //     mode: 'cors',
  //     headers: { Accept: 'application/json' }
  //   };

  //   await fetch(url, option)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       this.newsArg = this.setState(json);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  onNewsClick(ev) {
    const node = ev.currentTarget,
    arg = this.arg.get();

    location.href = arg[node.dataset.index].href;
  }

  onAllClick(ev) {
    location.href = 'event';
  }

  eventInit() {
    this.querySelectorAll('[data-action="news"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onNewsClick);
    });

    this.querySelectorAll('[data-action="all"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onAllClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="news"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onNewsClick);
    });

    this.querySelectorAll('[data-action="all"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onAllClick);
    });
  }

  async render() {
    // const news = this.newsArg.get('news');
    const arg = this.arg.get();


    let html = `
      <div class="container">
        <div class="row" style="--justify-content: space-between; --gap: 40px;">
          <div class="col" style="--width: 200px;">
            <div class="heading-md" style="--font-weight: bold;">
              <div>프린트뱅크</div>
              <div>다양한 소식을 한눈에!</div>
            </div>
            <div class="spacer" style="--height: 7px;"></div>
            <button class="btn btn-sm round-lg" data-action="all">
              <div style="display: flex; align-items: center; gap: 5px;">
                전체보기 <div class="icon-right-arrow"></div>
              </div>
            </button>
          </div>
          <div class="row" style="--gap: 20px;">
    `;

    arg.forEach((el, i, arr) => {
      html += `
        <div class="card cursor" style="--width: 540px; --cursor: pointer;" data-action="news" data-index="${i}">
          <div class="body img">
            <img src="${el.src}" alt="img">
          </div>
          <div class="footer">
            <div class="heading-sm blue" style="--font-weight:bold">${el.head}</div>
            <div class="display-md">${el.text}</div>
          </div>
        </div>
      `;
    });

    html +=  `
          </div>
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}