'use strict';

let obj = {
  foodData: {
    Ck8TMc484a: {
      id: "Ck8TMc484a",
      name: "М'ясне Сафарі (4 м'яса)",
      shortDescr: "Салямі, кабаносі, шинка тостова, балик, маринована цибуля, сир моцарела, помідори, червоний соус",
      weight: "620 грам",
      size: "30 см",
      img: "https://raw.githubusercontent.com/bambuuk/pizza/main/src/resources/img/pizza/meat-safari-4-meats.png",
      price: 210,
      productType: 'pizza'
    },
    F7g3JkYx2: {
      id: "F7g3JkYx2",
      name: "GRILLA",
      shortDescr: "Салямі, свинина, печериці, перець болгарський, маринована цибуля, помідори, моцарела, сирний соус, спеції",
      weight: "600 грам",
      size: "30 см",
      img: "https://github.com/bambuuk/pizza/blob/main/src/resources/img/pizza/grilla.png?raw=true",
      price: 225,
      productType: 'pizza'
    },
    J8n42Da7Nk: {
      id: "J8n42Da7Nk",
      name: "SoloWay White",
      shortDescr: "Куряче філе, печериці, помідор, моцарела, пармезан, соус сирний",
      weight: "550 грам",
      size: "30 см",
      img: "https://github.com/bambuuk/pizza/blob/main/src/resources/img/pizza/soloway-white.png?raw=true",
      price: 195,
      productType: 'pizza'
    },
    C5ti4V7n7X: {
      id: "C5ti4V7n7X",
      name: "Бургер DOUBLE KILL",
      shortDescr: "Подвійна котлета з яловичини, подвійний сир чеддер, подвійний бекон, помідор, соус чеддер",
      size: "82 мм",
      img: "https://raw.githubusercontent.com/bambuuk/pizza/main/src/resources/img/burger/burger-double-kill.jpg",
      price: 200,
      productType: 'burger'
    },
    hJL45Zjj95: {
      id: "hJL45Zjj95",
      name: "Бургер з яловичиною",
      shortDescr: "Котлета з яловичини, сир чеддер, айсберг, помідор, огірок квашений, карамелізована цибуля, соус біг мак",
      size: "82 мм",
      img: "https://github.com/bambuuk/pizza/blob/main/src/resources/img/burger/beef-burger.jpg?raw=true",
      price: 200,
      productType: 'burger'
    },
    VxkYH8287f: {
      id: "VxkYH8287f",
      name: "Бургер з свининою",
      shortDescr: "Котлета зі свинини з сиром моцарела, бекон, айсберг, помідор, огірок квашений, карамелізована цибуля, соус біг-мак",
      size: "82 мм",
      img: "https://github.com/bambuuk/pizza/blob/main/src/resources/img/burger/burger-with-pork.png?raw=true",
      price: 200,
      productType: 'burger'
    },
    nT8Af3z45L: {
      id: "nT8Af3z45L",
      name: "Крила медові",
      shortDescr: "Курячі крила в томатно-медовому соусі з кунжутом, які хочеться з'їсти з кісточками!",
      weight: "350 грам",
      img: "https://github.com/bambuuk/pizza/blob/main/src/resources/img/wings/honey-wings.png?raw=true",
      price: 150,
      productType: 'wings'
    },
    cft6G8M4N9: {
      id: "cft6G8M4N9",
      name: "Крила Чілі",
      shortDescr: "Курячі крила в гострому соусі з кунжутом, які хочеться з'їсти з кісточками!",
      weight: "350 грам",
      img: "https://github.com/bambuuk/pizza/blob/main/src/resources/img/wings/chile-wings.png?raw=true",
      price: 150,
      productType: 'wings'
    },
    FxU8t35Xg3: {
      id: "FxU8t35Xg3",
      name: "Крила гірчичні",
      shortDescr: "Курячі крила в гірчичному соусі з кунжутом, які хочеться з'їсти з кісточками!",
      weight: "350 грам",
      img: "https://github.com/bambuuk/pizza/blob/main/src/resources/img/wings/mustard-wings.png?raw=true",
      price: 150,
      productType: 'wings'
    },
    JK895yMf4u: {
      id: "JK895yMf4u",
      name: "Крила BBQ",
      shortDescr: "Курячі крила в соусі BBQ з кунжутом, які хочеться з'їсти з кісточками!",
      weight: "350 грам",
      img: "https://github.com/bambuuk/pizza/blob/main/src/resources/img/wings/bbq-wings.png?raw=true",
      price: 150,
      productType: 'wings'
    },
    fi4ZXE728u: {
      id: "fi4ZXE728u",
      name: "КАРТОПЛЯ ФРІ",
      shortDescr: "Найсмачніша у галактиці картопля фрі у фрітюрі.",
      weight: "100/35 грам",
      img: "https://github.com/bambuuk/pizza/blob/main/src/resources/img/frying/french-fries.png?raw=true",
      price: 60,
      productType: 'frying'
    },
    B28TEi66tb: {
      id: "B28TEi66tb",
      name: "Картопля Діп",
      shortDescr: "Картопля лодочка",
      weight: "100/35 грам",
      img: "https://github.com/bambuuk/pizza/blob/main/src/resources/img/frying/potato-dip.png?raw=true",
      price: 60,
      productType: 'frying'
    },
    Y55mfL82Vj: {
      id: "Y55mfL82Vj",
      name: "Нагетси",
      shortDescr: "Курячі нагетси в паніровці. Порція - 6шт (140грамів)",
      weight: "140/28 грам",
      img: "https://github.com/bambuuk/pizza/blob/main/src/resources/img/frying/nuggets.png?raw=true",
      price: 90,
      productType: 'frying'
    },
    j46V2RYbz5: {
      id: "j46V2RYbz5",
      name: "Пиво Bud 0.5L",
      shortDescr: "Пиво Bud 0.5L світле, фільтроване. 5%",
      img: "https://github.com/bambuuk/pizza/blob/main/src/resources/img/beer/bud-0.5.png?raw=true",
      price: 65,
      productType: 'beer'
    },
    j46V2RYbz5: {
      id: "j46V2RYbz5",
      name: "Пиво Beck's Ж/Б 0.5L",
      shortDescr: "Пиво Beck's 0.5L",
      img: "https://github.com/bambuuk/pizza/blob/main/src/resources/img/beer/becks-0.5L.png?raw=true",
      price: 65,
      productType: 'beer'
    },
    Be4z3m38TF: {
      id: "Be4z3m38TF",
      name: "Пиво Beck's Green Lemon Ж/Б 0.5L",
      shortDescr: "Пиво Beck's Green Lemon 0.5L 2,5% в жестяній банці",
      img: "https://github.com/bambuuk/pizza/blob/main/src/resources/img/beer/beck's-green-lemon-0.5L.png?raw=true",
      price: 60,
      productType: 'beer'
    },
    h5S9mN76kB: {
      id: "h5S9mN76kB",
      name: "Coca-Cola 0,33L Ж/Б",
      size: "0.33L",
      img: "https://github.com/bambuuk/pizza/blob/main/src/resources/img/drinksAsauces/coca-cola.png?raw=true",
      price: 25,
      productType: 'drinksAsauces'
    },
    e8M5XVhk86: {
      id: "e8M5XVhk86",
      name: "Соус BBQ",
      size: "28 грам",
      img: "https://github.com/bambuuk/pizza/blob/main/src/resources/img/drinksAsauces/sauce-BBQ.png?raw=true",
      price: 10,
      productType: 'drinksAsauces'
    },
    X7dme7R2T: {
      id: "X7dme7R2T",
      name: "Соус Кетчуп",
      size: "28 грам",
      img: "https://github.com/bambuuk/pizza/blob/main/src/resources/img/drinksAsauces/ketchup-sauce.png?raw=true",
      price: 10,
      productType: 'drinksAsauces'
    },
  }
}

let objJson = JSON.stringify(obj);
console.log(objJson)