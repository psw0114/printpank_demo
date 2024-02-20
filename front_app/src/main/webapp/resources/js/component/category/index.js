import UtilsComponent from '../utils/index.js';
import Product from './product.js';

export default class Component {
  constructor() {
    new UtilsComponent();

    customElements.define('pb-category-product', Product, { extends: 'div' });
  }
}