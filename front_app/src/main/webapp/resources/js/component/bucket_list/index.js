import Content from './contents.js';
import Bucket from './bucket.js';
import UtilsComponent from '../utils/index.js';
import Payment from './payment.js';

export default class Component {
  constructor() {
    new UtilsComponent();

    customElements.define('pb-bucketlist-content', Content, { extends: 'div' });
    customElements.define('pb-bucketlist-bucket', Bucket, { extends: 'div' });
    customElements.define('pb-bucketlist-payment', Payment, { extends: 'div' });
  }
}