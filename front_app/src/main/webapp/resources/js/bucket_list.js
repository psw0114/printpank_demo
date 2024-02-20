import Component from './component/bucket_list/index.js';
import PBElement from './utils/pb_element.js';
import Utils from './utils/utils.js';
import { bucket } from './data/bucket_list.js';
import { recommend, news } from './data/utils.js';

class BucketList extends PBElement {
  // bucketArg = bucket;

  recommendArg = recommend;

  newsArg = news;

  constructor() {
    super();

    new Component();
  }

  async init() {
    await this.getBucket_listBucket();
  }

  async getBucket_listBucket() {
    const url = new URL('bucket_list/content', location.origin),
    option = {
      method : 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' }
    };

    await fetch(url,option)
      .then((Response) => Response.json())
      .then((json) => {
        this.bucketArg = {
          ...json,
          step: 1
        };
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async render() {
    console.log(this.bucketArg);
    let html = `
      <div is="pb-bucketlist-content" data-root="pb-bucketlist" data-arg="bucketArg"></div>

      <div class="spacer" style="--height: 80px;"></div>
      <div is="pb-recommend" data-root="pb-bucketlist" data-arg="recommendArg"></div>

      <div class="spacer" style="--height: 80px;"></div>
      <div is="pb-news" data-root="pb-bucketlist" data-arg="newsArg"></div>

      <div class="spacer" style="--height: 100px;"></div>
    `;

    this.innerHTML = html;
  }
}

customElements.define('pb-bucketlist', BucketList, { extends: 'div' });