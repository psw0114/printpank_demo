import Bucket from './bucket.js';

export default class Component {
  constructor() {
    customElements.define('pb-product-modal-bucket', Bucket, { extends: 'div' });
  }
}