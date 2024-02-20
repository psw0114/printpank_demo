const faq = {
  btn: [
    {
      text: '전체보기',
      active: true
    }, {
      text: '배송',
      active: false
    }, {
      text: '입금/결제',
      active: false
    }, {
      text: '취소/환불',
      active: false
    }, {
      text: '데이터관련',
      active: false
    }, {
      text: '기타',
      active: false
    }
  ],
  item: (new Array(10)).fill({
    question: "자주 묻는 질문",
    answer: "자주 하는 답변",
    active: false
  }).map((el) => {
    return { ...el };
  })
},
notice = {
  btn: [
    {
      text: '전체보기',
      active: true
    }, {
      text: '상품안내',
      active: false
    }, {
      text: '배송안내',
      active: false
    }, {
      text: '취소/환불',
      active: false
    }, {
      text: '이벤트',
      active: false
    }, {
      text: '기타',
      active: false
    }
  ],
  item: (new Array(7)).fill({
    title: '[상품안내] 공급가격 순차적 인상 안내',
    date: '2023.09.21',
    text: '어떤 소식, 여러가지 소식',
    isMain: false,
    active: false
  }).map((el, i, arr) => {
    return {
      ...el,
      isMain: (i == 0)
        ? true
        : false,
    };
  })
},
qna = {
  btn: [
    {
      text: '문의하기',
      active: true
    }, {
      text: '전화상담하기',
      active: false
    }
  ],
  item: (new Array(7)).fill({
    type: 'A/S',
    title: '문의한다는 내용',
    orderNum: 'RET2309221097',
    date: '2023.09.21',
    proc: '답변완료',
    color: ''
  }).map((el, i, arr) => {
    const result = { ...el };

    if ([1, 3].includes(i)) {
      result.proc = '진행중';
      result.color = 'red';
    } else if ([2, 5].includes(i)) {
      result.proc = '접수완료';
      result.color = 'blue';
    }

    return result;
  })
},
download = {
  btn: [
    {
      text: "사각귀돌이 스티커",
      active: true
    }, {
      text: "사각 스티커",
      active: false
    }, {
      text: "정사각 귀돌이 스티커",
      active: false
    }, {
      text: "정사각 스티커",
      active: false
    }, {
      text: "정원 스티커",
      active: false
    }, {
      text: "타원 스티커",
      active: false
    }
  ],
  item: (new Array(9)).fill({
    num: 9,
    divide: '사각귀돌이 스티커',
    size: '500x500',
    file_name: 'JR_500x500_2'
  }).map((el, i, arr) => {
    return {
      ...el,
      num: 9 - i
    };
  })
},
sideMenu = [
  {
    type: 'A',
    title: 'FAQ',
    el: 'pb-customer-faq',
    arg: 'faqArg'
  }, {
    type: 'B',
    title: '공지사항',
    el: 'pb-customer-notice',
    arg: 'noticeArg'
  }, {
    type: 'C',
    title: '1: 1 문의',
    el: 'pb-customer-qna',
    arg: 'qnaArg'
  }, {
    type: 'D',
    title: '접수안내',
    el: 'pb-customer-faq',
    arg: 'faqArg'
  }, {
    type: 'E',
    title: '배송안내',
    el: 'pb-customer-faq',
    arg: 'faqArg'
  }, {
    type: 'F',
    title: '다운로드',
    subType: [
      {
        type:'A',
        el: 'pb-customer-download-sticker',
        arg: 'downloadArg',
        title: '스티커 칼선'
      }, {
        type:'B',
        el: 'pb-customer-download-bag',
        arg: 'downloadArg',
        title: '봉투 칼선'
      }, {
        type:'C',
        el: 'pb-customer-download-calender',
        arg: 'downloadArg',
        title: '캘린더 칼선'
      }, {
        type:'D',
        el: 'pb-customer-download-etc',
        arg: 'downloadArg',
        title: '기타 칼선'
      }
    ]
  }
];

export {
  faq,
  notice,
  qna,
  download,
  sideMenu
};