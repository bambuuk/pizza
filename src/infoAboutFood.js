'use strict';

let obj = {
  foodData: {
    Ck8TMc484a: {
      id: "Ck8TMc484a",
      name: "М'ясне Сафарі (4 м'яса)",
      shortDescr: "Салямі, кабаносі, шинка тостова, балик, маринована цибуля, сир моцарела, помідори, червоний соус",
      weight: "620 грам",
      size: "30 см",
      img: "./resources/img/pizza/мясне-сафарі-4-мяса.png",
      price: 210,
      productTipe: 'pizza'
    },
    F7g3JkYx2: {
      id: "F7g3JkYx2",
      name: "GRILLA",
      shortDescr: "Салямі, свинина, печериці, перець болгарський, маринована цибуля, помідори, моцарела, сирний соус, спеції",
      weight: "600 грам",
      size: "30 см",
      img: "./resources/img/pizza/grilla.png",
      price: 225,
      productTipe: 'pizza'
    },
    J8n42Da7Nk: {
      id: "J8n42Da7Nk",
      name: "SoloWay White",
      shortDescr: "Куряче філе, печериці, помідор, моцарела, пармезан, соус сирний",
      weight: "550 грам",
      size: "30 см",
      img: "./resources/img/pizza/soloway-white.png",
      price: 195,
      productTipe: 'pizza'
    },
    C5ti4V7n7X: {
      id: "C5ti4V7n7X",
      name: "Бургер DOUBLE KILL",
      shortDescr: "Подвійна котлета з яловичини, подвійний сир чеддер, подвійний бекон, помідор, соус чеддер",
      size: "82 мм",
      img: "",
      price: 200,
      productTipe: 'burger'
    },
    hJL45Zjj95: {
      id: "hJL45Zjj95",
      name: "Бургер з яловичиною",
      shortDescr: "Котлета з яловичини, сир чеддер, айсберг, помідор, огірок квашений, карамелізована цибуля, соус біг мак",
      size: "82 мм",
      img: "",
      price: 200,
      productTipe: 'burger'
    },
    VxkYH8287f: {
      id: "VxkYH8287f",
      name: "Бургер з свининою",
      shortDescr: "Котлета зі свинини з сиром моцарела, бекон, айсберг, помідор, огірок квашений, карамелізована цибуля, соус біг-мак",
      size: "82 мм",
      img: "",
      price: 200,
      productTipe: 'burger'
    },
    nT8Af3z45L: {
      id: "nT8Af3z45L",
      name: "Крила медові",
      shortDescr: "Курячі крила в томатно-медовому соусі з кунжутом, які хочеться з'їсти з кісточками!",
      weight: "350 грам",
      img: "",
      price: 150,
      productTipe: 'wings'
    },
    cft6G8M4N9: {
      id: "cft6G8M4N9",
      name: "Крила Чілі",
      shortDescr: "Курячі крила в гострому соусі з кунжутом, які хочеться з'їсти з кісточками!",
      weight: "350 грам",
      img: "",
      price: 150,
      productTipe: 'wings'
    },
    FxU8t35Xg3: {
      id: "FxU8t35Xg3",
      name: "Крила гірчичні",
      shortDescr: "Курячі крила в гірчичному соусі з кунжутом, які хочеться з'їсти з кісточками!",
      weight: "350 грам",
      img: "",
      price: 150,
      productTipe: 'wings'
    },
    JK895yMf4u: {
      id: "JK895yMf4u",
      name: "Крила BBQ",
      shortDescr: "Курячі крила в соусі BBQ з кунжутом, які хочеться з'їсти з кісточками!",
      weight: "350 грам",
      img: "",
      price: 150,
      productTipe: 'wings'
    },
    fi4ZXE728u: {
      id: "fi4ZXE728u",
      name: "КАРТОПЛЯ ФРІ",
      shortDescr: "Найсмачніша у галактиці картопля фрі у фрітюрі.",
      weight: "100/35 грам",
      img: "",
      price: 60,
      productTipe: 'frying'
    },
    B28TEi66tb: {
      id: "B28TEi66tb",
      name: "Картопля Діп",
      shortDescr: "Картопля лодочка",
      weight: "100/35 грам",
      img: "",
      price: 60,
      productTipe: 'frying'
    },
    Y55mfL82Vj: {
      id: "Y55mfL82Vj",
      name: "Нагетси",
      shortDescr: "Курячі нагетси в паніровці. Порція - 6шт (140грамів)",
      weight: "140/28 грам",
      img: "",
      price: 90,
      productTipe: 'frying'
    },
    j46V2RYbz5: {
      id: "j46V2RYbz5",
      name: "Пиво Bud 0.5L",
      shortDescr: "Пиво Bud 0.5L світле, фільтроване. 5%",
      img: "",
      price: 65,
      productTipe: 'beer'
    },
    j46V2RYbz5: {
      id: "j46V2RYbz5",
      name: "Пиво Beck's Ж/Б 0.5L",
      shortDescr: "Пиво Beck's 0.5L",
      img: "",
      price: 65,
      productTipe: 'beer'
    },
    Be4z3m38TF: {
      id: "Be4z3m38TF",
      name: "Пиво Beck's Green Lemon Ж/Б 0.5L",
      shortDescr: "Пиво Beck's Green Lemon 0.5L 2,5% в жестяній банці",
      img: "",
      price: 60,
      productTipe: 'beer'
    },
    h5S9mN76kB: {
      id: "h5S9mN76kB",
      name: "Coca-Cola 0,33L Ж/Б",
      size: "0.33L",
      img: "",
      price: 25,
      productTipe: 'drinksAsauces'
    },
    e8M5XVhk86: {
      id: "e8M5XVhk86",
      name: "Соус BBQ",
      size: "28 грам",
      img: "",
      price: 10,
      productTipe: 'drinksAsauces'
    },
    X7dme7R2T: {
      id: "X7dme7R2T",
      name: "Соус Кетчуп",
      size: "28 грам",
      img: "",
      price: 10,
      productTipe: 'drinksAsauces'
    },
  }
}

let objJson = JSON.stringify(obj);
console.log(objJson)