import Product from './product.js';
import UtilsComponent from '../utils/index.js';

export default class EventPage {
  constructor() {
    new UtilsComponent();

    customElements.define('pb-event-product', Product, { extends: 'div' });
  }
}