import UtilsComponent from '../utils/index.js';
import Main from './main.js';
import FAQ from './faq.js';
import Notice from './notice.js';
import QNA from './qna.js';
import Bag from './bag.js';
import Calender from './calender.js';
import EtcDownload from './etcdown.js';
import Sticker from './sticker.js';

export default class Component {
  constructor() {
    new UtilsComponent();

    customElements.define('pb-customer-main', Main, { extends: 'div' });
    customElements.define('pb-customer-faq', FAQ, { extends: 'div' });
    customElements.define('pb-customer-notice', Notice, { extends: 'div' });
    customElements.define('pb-customer-qna', QNA, { extends: 'div' });
    customElements.define('pb-customer-download-sticker', Sticker, { extends: 'div' });
    customElements.define('pb-customer-download-bag', Bag, { extends: 'div' });
    customElements.define('pb-customer-download-calender', Calender, { extends: 'div' });
    customElements.define('pb-customer-download-etc', EtcDownload, { extends: 'div' });
  }
}