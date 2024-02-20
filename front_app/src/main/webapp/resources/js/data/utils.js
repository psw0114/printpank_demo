const recommend = {
  isSide: false,
  item: (new Array(9)).fill({
    href: "product",
    src: "",
    alt: "img",
    title: "고품격명함",
    text: "고품격명함입니다.",
    amount: 100,
    price: 3000
  }).map((el) => {
    return { ...el };
  })
},
news = {
  news: [
    {
      href: "customer",
      src: "",
      head: "NEW 이번주 소식",
      text: "이번주 신규 소식을 확인해보세요!"
    }, {
      href: "customer",
      src: "",
      head: "Event 이벤트 신청하세요!",
      text: "이벤트 신청하시고 샘플 받아가세요."
    }
  ]
},
subBanner = {
  href: "customer",
  src: "",
  alt: "img"
};

export {
  recommend,
  news,
  subBanner
};