import Banner from './banner.js';
import Product from './product.js';
import Notice from './notice.js';
import Review from './review.js';
import UtilsComponent from '../utils/index.js';

export default class Component {
  constructor() {
    new UtilsComponent();

    customElements.define('pb-main-banner', Banner, { extends: 'div' });
    customElements.define('pb-main-product', Product, { extends: 'div' });
    customElements.define('pb-main-notice', Notice, { extends: 'div' });
    customElements.define('pb-main-review', Review, { extends: 'div' });
  }
}