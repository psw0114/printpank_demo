import Footer from './footer.js';
import Header from './header.js';
import News from './news.js';
import Recommend from './recommend.js';
import SubBanner from './sub_banner.js';
import Title from './title.js';
import SideMenu from './side_menu.js';
import Modal from './modal.js';
import ModalComponent from '../modal/index.js';
import SideImage from './side-image.js';

export default class Component {
  constructor() {
    new ModalComponent();

    customElements.define('pb-header', Header, { extends: 'div' });
    customElements.define('pb-footer', Footer, { extends: 'div' });
    customElements.define('pb-news', News, { extends: 'div' });
    customElements.define('pb-recommend', Recommend, { extends: 'div' });
    customElements.define('pb-sub-banner', SubBanner, { extends: 'div' });
    customElements.define('pb-title', Title, { extends: 'div' });
    customElements.define('pb-side-menu', SideMenu, { extends: 'div' });
    customElements.define('pb-modal', Modal, { extends: 'div' });
    customElements.define('pb-side-image', SideImage, { extends: 'div' });
  }
}