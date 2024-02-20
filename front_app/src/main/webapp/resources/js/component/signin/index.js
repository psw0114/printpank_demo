import UtilsComponent from '../utils/index.js';
import SginInBody from './signin_body.js';

export default class Component {
  constructor() {
    new UtilsComponent();

    customElements.define('pb-signin-body', SginInBody, { extends: 'div' });
  }
}