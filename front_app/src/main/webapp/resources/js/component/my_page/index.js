import UtilsComponent from '../utils/index.js';
import Consulting from './consulting.js';
import Delivery from './delivery.js';
import Manage from './manage.js';
import MyAs from './my_as.js';
import MyEst from './my_est.js';
import MyInfo from './my_info.js';
import MyMtm from './my_mtm.js';
import Parcel from './parcel.js';

export default class Component {
  constructor() {
    new UtilsComponent();

    customElements.define('pb-my-page-parcel', Parcel, { extends:'div' });
    customElements.define('pb-my-page-manage', Manage, { extends:'div' });
    customElements.define('pb-my-page-delivery', Delivery, { extends: 'div' });
    customElements.define('pb-my-page-mtm', MyMtm, { extends:'div' });
    customElements.define('pb-my-page-as', MyAs, { extends:'div' });
    customElements.define('pb-my-page-est', MyEst, { extends:'div' });
    customElements.define('pb-my-page-consulting', Consulting, { extends:'div' });
    customElements.define('pb-my-page-user', MyInfo, { extends:'div' });
  }
}