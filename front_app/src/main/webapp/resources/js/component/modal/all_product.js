import PBElement from '../../utils/pb_element.js';
import Utils from '../../utils/utils.js';

export default class Allprocut extends PBElement {
  constructor() {
    super();

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onShowClick = this.onShowClick.bind(this);
    this.onMiddleClick = this.onMiddleClick.bind(this);
    this.onShowImgClick = this.onShowImgClick.bind(this);
    this.onSwitchClick = this.onSwitchClick.bind(this);

    this.setAttribute('id', 'modal-content');
    this.classList.add('modal-body');
    this.style.setProperty('--height', 'unset');
    this.style.setProperty('--width', '1300px');
    this.style.setProperty('max-width', '1300px');
  }

  argInit() {
    this.arg = document.querySelector(`div[is="${this.dataset.root}"] div[is="pb-modal"]`)?.arg;
    console.log(this.arg); 
  }

  onCloseClick(ev) {
    this.arg.set({
      ...this.arg.get(),
      data: null,
      type: null
    });
  }

  onShowClick(ev) {
    const node = ev.currentTarget,
    data = this.arg.get('data'),
    index = parseInt(node.dataset.index);


    this.arg.set(
      'data',
      data.map((el, i, arr) => {
        return {
          ...el,
          active: (i == index),
          subItem: el.subItem?.map((s_el, s_i , s_arr) => {
            return {
              ...s_el,
              active: (!Utils.empty(s_el.item))
                ? false
                : s_el.active,
                subItem: s_el.subItem.map((p_el, p_i, p_arr) => {
                return {
                  ...p_el,
                  active: false
                };
              })
            };
          })
        };
      })
    );
  }

  onMiddleClick(ev) {
    const node = ev.currentTarget,
    data = this.arg.get('data'),
    index = parseInt(node.dataset.index);

    this.arg.set(
      'data',
      data.map((el, i, arr) => {
        return {
          ...el,
          subItem: (el.active)
            ? el.subItem?.map((s_el, s_i, s_arr) => {
              return {
                ...s_el,
                active: (s_i == index)
              };
            })
            : el.subItem
        };
      })
    );
  }

  onShowImgClick(ev) {
    const node = ev.currentTarget,
    data = this.arg.get('data'),
    index = parseInt(node.dataset.index);

    this.arg.set(
      'data',
      data.map((el, i, arr) => {
        return {
          ...el,
          subItem: (el.active)
            ? el.subItem?.map((s_el, s_i, s_arr) => {
              return {
                ...s_el,
                subItem: (s_el.active)
                  ? s_el.subItem.map((p_el, p_i, p_arr) => {
                    return {
                      ...p_el,
                      active: (p_i == index)
                    };
                  })
                  : s_el.subItem
              };
            })
            : el.subItem
        };
      })
    );
  }

  onSwitchClick(ev) {
    const node = ev.currentTarget,
    data = this.arg.get('data'),
    index = parseInt(node.dataset.index);

    this.arg.set(
      'data',
      data.map((el, i, arr) => {
        return {
          ...el,
          subItem: (el.active)
            ? el.subItem?.map((s_el, s_i, s_arr) => {
              return {
                ...s_el,
                subItem: (s_el.active)
                  ? s_el.subItem.map((p_el, p_i, p_arr) => {
                    return {
                      ...p_el,
                      subItem: (p_el.active)
                        ? p_el.subItem.map((i_el, i_i, i_arr) => {
                          return {
                            ...i_el,
                            active: (i_i == index)
                          };
                        })
                        : p_el.subItem
                    };
                  })
                  : s_el.subItem
              };
            })
            : el.subItem
        };
      })
    );
  }

  onMainImgClick(ev) {
    location.href = 'product';
  }

  eventInit() {
    this.querySelectorAll('[data-action="close"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onCloseClick);
    });

    this.querySelectorAll('[data-action="show"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onShowClick);
    });

    this.querySelectorAll('[data-action="middle"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onMiddleClick);
    });

    this.querySelectorAll('[data-action="show-img"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onShowImgClick);
    });

    this.querySelectorAll('[data-action="switch"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onSwitchClick);
    });

    this.querySelectorAll('[data-action="main_img"]').forEach((el, i, arr) => {
      el.addEventListener('click', this.onMainImgClick);
    });
  }

  destroy() {
    this.querySelectorAll('[data-action="close"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onCloseClick);
    });

    this.querySelectorAll('[data-action="show"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onShowClick);
    });

    this.querySelectorAll('[data-action="middle"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onMiddleClick);
    });

    this.querySelectorAll('[data-action="show-img"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onShowImgClick);
    });

    this.querySelectorAll('[data-action="switch"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onSwitchClick);
    });

    this.querySelectorAll('[data-action="main_img"]').forEach((el, i, arr) => {
      el.removeEventListener('click', this.onMainImgClick);
    });
  }

  async render() {
    const data = this.arg.get('data');

    console.log(data);
    let html = `
      <div class="all-product">
        <div class="row" style="--gap: 20px;">
          <div class="product-item heading-md">
    `;

    data.forEach((el, i, arr) => {
      html += `
        <div class="item-title cursor ${el.active ? 'active' : ''}" style="--cursor: pointer;" data-action="show" data-index="${i}">${el.item}</div>
        <div class="product-items body-md">
      `;

      el.subItem?.forEach((s_el, s_i, s_arr) => {
        if (!Utils.empty(s_el.item)) {
          html += `
            <div class="items cursor ${s_el.active ? 'active' : ''}" data-action="middle" data-index="${s_i}" style="--cursor: pointer;">
              ㄴ ${s_el.item}
            </div>
          `;
        }
      });

      html += `</div>`;
    });

    html += `
      </div>
      <div class="product-list body-sm">
    `;

    data
      .filter((el) => el.active)[0]?.subItem
      ?.filter((el) => el.active)[0]?.subItem
      .forEach((el, i, arr) => {
        html += `
          <div class="lists cursor ${el.active ? 'active' : ''}" style="--cursor: pointer;" data-action="show-img" data-index="${i}">
            ${el.item}
          </div>
        `;
      });

    html += `
      </div>
      <div class="col imgs">
    `;

    data
      .filter((el) => el.active)[0]?.subItem
      ?.filter((el) => el.active)[0]?.subItem
      .filter((el) => el.active)[0]?.subItem
      .forEach((el, i, arr) => {
        if (arr.some((el) => el.active) ? el.active : (i == 0)) {
          html += `
            <div class="main-img cursor" style="--cursor: pointer;" data-action="main_img">
              <img src="${el.src}">
            </div>
          `;
        }
      });

    html += `<div class="row">`;

    data
      .filter((el) => el.active)[0]?.subItem
      ?.filter((el) => el.active)[0]?.subItem
      .filter((el) => el.active)[0]?.subItem
      .forEach((el, i, arr) => {
        html += `
          <div class="sub-img cursor" style="--cursor: pointer;" data-action="switch" data-index="${i}">
            <img src="${el.src}">
          </div>
        `;
      });

    html += `
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-area">
        <div class="row body-md" style="--justify-content: center;">
          <button class="btn btn-lg round-md outline-red" data-action="close">닫기</button>
        </div>
      </div>
    `;

    this.innerHTML = html;
  }
}