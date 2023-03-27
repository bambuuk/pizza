'use strict';

let obj = {
  foodData: {
    Ck8TMc484a: {
      id: "Ck8TMc484a",
      name: "М'ясне Сафарі (4 м'яса)",
      shortDescr: "Салямі, кабаносі, шинка тостова, балик, маринована цибуля, сир моцарела, помідори, червоний соус",
      weight: 620,
      size: 30,
      img: "./resources/img/pizza/мясне-сафарі-4-мяса.png",
      price: 210
    },
    F7g3JkYx2: {
      id: "F7g3JkYx2",
      name: "GRILLA",
      shortDescr: "Салямі, свинина, печериці, перець болгарський, маринована цибуля, помідори, моцарела, сирний соус, спеції",
      weight: 600,
      size: 30,
      img: "./resources/img/pizza/grilla.png",
      price: 225
    },
    J8n42Da7Nk: {
      id: "J8n42Da7Nk",
      name: "SoloWay White",
      shortDescr: "Куряче філе, печериці, помідор, моцарела, пармезан, соус сирний",
      weight: 550,
      size: 30,
      img: "./resources/img/pizza/soloway-white.png",
      price: 195
    },
  }
}

let objJson = JSON.stringify(obj);
console.log(objJson)