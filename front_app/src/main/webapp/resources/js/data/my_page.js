const sideMenu = [
  // {
  //   type: 'A',
  //   title: '장바구니',
  //   el: 'pb-my-page-delivery',
  //   arg: 'deliveryArg'
  // },
  {
    type: 'A',
    title: '배송지 관리',
    el: 'pb-my-page-parcel',
    arg: 'parcelArg'
  }, {
    type: 'B',
    title: '담당자 관리',
    el: 'pb-my-page-manage',
    arg: 'managerArg'
  }, {
    type: 'C',
    title: '주문/배송 조회',
    el: 'pb-my-page-delivery',
    arg: 'deliveryArg'
  }, {
    type: 'D',
    title: '1:1 문의내역',
    el: 'pb-my-page-mtm',
    arg: 'mtmArg'
  }, {
    type: 'E',
    title: 'A/S 상담',
    el: 'pb-my-page-as',
    arg: 'mtmArg'
  }, {
    type: 'F',
    title: '견적상담',
    el: 'pb-my-page-est',
    arg: 'mtmArg'
  }, {
    type: 'G',
    title: '접수안내',
    subType: [
      {
        type: 'A',
        title: '어떤거',
        el: 'pb-my-page-parcel',
        arg: 'parcelArg',
      }, {
        type: 'B',
        title: '어떤거',
        el: 'pb-my-page-manage',
        arg: 'managerArg',
      }, {
        type: 'C',
        title: '어떤거',
        el: 'pb-my-page-delivery',
        arg: 'deliveryArg',
      }, {
        type: 'D',
        title: '어떤거',
        el: 'pb-my-page-as',
        arg: 'mtmArg',
      }
    ]
  }, {
    type: 'H',
    title: '회원정보관리',
    el: 'pb-my-page-user',
    arg: 'userInfoArg'
  }
];

export {
  sideMenu
};