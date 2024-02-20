const product = {
  item: (new Array(15)).fill({
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
};

export {
  product
};