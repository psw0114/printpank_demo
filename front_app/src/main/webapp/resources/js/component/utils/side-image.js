// 제거예정
import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class SideImage extends PBElement {
  constructor() {
    super();

    this.onSideImageScroll = this.onSideImageScroll.bind(this);
  }

  async init() {
    this.arg = this.setState(this.arg);
  }

  onSideImageScroll() {
    const sideImage = this.querySelector('.side-image'),
    oneSideWidth = (this.parentElement.offsetWidth - 1360) / 2 ;

    if (window.scrollY > 120 && oneSideWidth > 200) {
      sideImage.classList.add('on-side-image');
    } else {
      sideImage.classList.remove('on-side-image');
    }
  }

  eventInit() {
    window.addEventListener('scroll', this.onSideImageScroll);
  }

  destroy() {
    window.removeEventListener('scroll', this.onSideImageScroll);
  }

  async render() {
    const arg = this.arg.get();

    let html = `
      <div class="side-image container">
        <img src ="${arg.src}" alt ="${arg.alt}">
      </div>
    `;

    this.innerHTML = html;
  }
}