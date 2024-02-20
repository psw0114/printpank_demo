import UtilsComponent from '../utils/index.js';
import ModalComponent from './modal/index.js';
import Detail from './detail.js';
import ProductDesc from './product_desc.js';
import Receipt from './receipt.js';
import Info from './info.js';
import Pinfo from './pinfo.js';
import Pguide from './pguide.js';
import Dinfo from './dinfo.js';
import Review from './review.js';

export default class Component {
  constructor() {
    new UtilsComponent();
    new ModalComponent();

    customElements.define('pb-product-desc', ProductDesc, { extends: 'div' });
    customElements.define('pb-product-detail', Detail, { extends: 'div' });
    customElements.define('pb-product-info-content', Info, {extends: 'div'});
    customElements.define('pb-product-receipt', Receipt, {extends: 'div'});
    customElements.define('pb-product-info', Pinfo, {extends: 'div'});
    customElements.define('pb-product-guide', Pguide, {extends: 'div'});
    customElements.define('pb-delivery-info', Dinfo, {extends: 'div'});
    customElements.define('pb-review', Review, {extends: 'div'});
  }
}