import UtilsComponent from '../utils/index.js';
import Title from './title.js';
import AllAgree from './all_agree.js';
import Term from './term.js';
import Button from './button.js';

export default class EventPage {
  constructor() {
    new UtilsComponent();

    customElements.define('pb-signup-title', Title, { extends: 'div' });
    customElements.define('pb-signup-all-agree', AllAgree, { extends: 'div' });
    customElements.define('pb-signup-term', Term, { extends: 'div' });
    customElements.define('pb-signup-button', Button, { extends: 'div' });
  }
}