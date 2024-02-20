import FileUpload from './file_upload.js';
import OptionDetail from './option_detail.js';
import WorkMemo from './work_memo.js';
import Parcel from './parcel.js';
import Allproduct from './all_product.js';
import Manager from './manager.js';
import Knowhow from './knowhow.js';
import ProductModal from './product_modal.js';
import AccountPay from './accountpay.js';
import CardPay from './cardpay.js';
import Partition from './partition.js';
import Buy from './buy.js';
import Review from './review.js'

export default class Component {
  constructor() {
    customElements.define('pb-modal-file-upload', FileUpload, { extends: 'div' });
    customElements.define('pb-modal-option-detail', OptionDetail, { extends: 'div' });
    customElements.define('pb-modal-work-memo', WorkMemo, { extends: 'div' });
    customElements.define('pb-modal-parcel', Parcel, { extends: 'div' });
    customElements.define('pb-modal-all-product', Allproduct, {extends : 'div'});
    customElements.define('pb-modal-knowhow', Knowhow, {extends : 'div'});
    customElements.define('pb-modal-manager', Manager, {extends : 'div'});
    customElements.define('pb-modal-product-modal', ProductModal, { extends: 'div' });
    customElements.define('pb-modal-account-pay', AccountPay, { extends: 'div' });
    customElements.define('pb-modal-card-pay', CardPay, { extends: 'div' });
    customElements.define('pb-modal-partition', Partition, { extends: 'div' });
    customElements.define('pb-modal-buy', Buy, { extends: 'div' });
    customElements.define('pb-modal-review-input', Review, { extends: 'div' });
  }
}