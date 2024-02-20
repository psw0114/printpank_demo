const bucket = {
  item: (new Array(6)).fill({
    src: "",
    pdname: '가나다라_명함1',
    optionlist: '사각재단 스티커 / 배경없음(원터치) / 강접 아트지90g 유광코팅 별사이즈 (60x50mm)',
    quantity: [
      {
        quantity : 1000,
        parcel: false, // 배송입력 여부
        checked:false
      }
    ],
    case: 1, // 건수
    price: 10000,
    min_count: 100, // 최소 주문 수량
    memo: '작업메모사항입니다. 오늘배송나가게해주세요~!!!!!!작업메모사항입니다. 오늘배송...',
  }).map((el) => {
    return { ...el };
  }),
  step: "1"
},
modal = {
  type: null,
  A: { el: 'pb-modal-option-detail' },
  B: { el: 'pb-modal-file-upload' },
  C: { el: 'pb-modal-work-memo' },
  D: { el: 'pb-modal-partition' },
  E: { el: 'pb-modal-parcel' }
};

export {
  bucket,
  modal
};