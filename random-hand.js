// 假设这是同事的代码。但是他永远都不回来了
// 这时候最好的办法并不是重写，而是根据需求修改代码 并添加测试
// 小项目是可以重写的，但是大型项目不推荐
const deepEqual = require("deep-equal");
const cardArray = require("./config/card-array");
const assert = require("assert");
const wish = require("wish");

const suits = ["H", "S", "D", "C"];
const values = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];

// 将全局变量转为局部变量 这样就减少了副作用
// var c = [];

const randomSuit = function() {
  return suits[Math.floor(Math.random() * suits.length)];
};

const randomValue = function() {
  return values[Math.floor(Math.random() * values.length)];
};

const randomCard = function() {
  return randomValue() + "-" + randomSuit();
};

var randomHand = function() {
  var cards = [];
  var deckSize = 52;
  var cardArray = buildCardArray();
  cards.push(cardArray.splice(Math.floor(Math.random() * deckSize), 1)[0]);
  cards.push(cardArray.splice(Math.floor(Math.random() * deckSize), 1)[0]);
  cards.push(cardArray.splice(Math.floor(Math.random() * deckSize), 1)[0]);
  cards.push(cardArray.splice(Math.floor(Math.random() * deckSize), 1)[0]);
  cards.push(cardArray.splice(Math.floor(Math.random() * deckSize), 1)[0]);
  return cards;
};

function buildCardArray() {
  var tempArray = [];
  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < suits.length; j++) {
      tempArray.push(values[i] + "-" + suits[j]);
    }
  }
  return tempArray;
}

function spliceCard(cardArray) {
  var takeAway = cardArray.splice(
    Math.floor(Math.random() * cardArray.length),
    1
  )[0];
  return [takeAway, cardArray];
}

// 重构 randomHand 使用提炼方法进行重构
var randomHand = function() {
  var cards = [];
  var cardArray = buildCardArray();
  var result = spliceCard(cardArray);
  cards[0] = result[0];
  cardArray = result[1];
  result = spliceCard(cardArray);
  cards[1] = result[0];
  cardArray = result[1];
  result = spliceCard(cardArray);
  cards[2] = result[0];
  cardArray = result[1];
  result = spliceCard(cardArray);
  cards[3] = result[0];
  cardArray = result[1];
  result = spliceCard(cardArray);
  cards[4] = result[0];
  cardArray = result[1];
  result = spliceCard(cardArray);
  return cards;
};

// 特性测试，就是说某个函数在特定条件下会有特定的返回值，这时候测试会通过
// 写特性时时尽量不去考虑不同类型的相等和强制类型转换 例如 undefined == null
// 所以我们选择用wish 而不是下面的assert
// assert.equal(result, null);
// wish 第二个参数为 characterizing : boolean

// 事实上，如果一个测试的错误显示他的返回值是undefined 意味着他有副作用
// 副作用 : 打印、修改变量、修改数据库等行为
describe("randomHand()", function() {
  it("returns something with a length of 5", function() {
    var result = randomHand();
    wish(result.length === 5);
  });
});

// 一下我们进行一个慢速的迭代测试，但这个测试不稳定，我们可以增加次数避免失败
describe("randomHand()", function() {
  for (var i = 0; i < 1000; i++) {
    it("should not have the first two cards be the same", function() {
      var result = randomHand();
      wish(result[0] !== result[1]);
    });
  }
});

// describe("randomCard()", function() {
//   it("returns something", function() {
//     wish(randomCard(),true)
//   });
// });

// describe("randomValue()", function() {
//   it("returns something", function() {
//     wish(randomValue(),true)
//   });
// });

// describe("randomSuit()", function() {
//   it("returns something", function() {
//     wish(randomSuit(),true)
//   });
// });

// 对于特性测试的第二部分，就是对返回非null得函数，插入输入值并断言测试返回的任何内容
// 如果一个函数的返回值具有随机性，则用正则表达式来表达断言

describe("randomCard()", function() {
  it("returns something", function() {
    wish(randomCard().match(/\w{1,2}-[HDSC]/));
  });
});

describe("randomValue()", function() {
  it("returns something", function() {
    wish(randomValue().match(/\w{1,2}/));
  });
});

describe("randomSuit()", function() {
  it("returns something", function() {
    wish(randomSuit().match(/[HDSC]/));
  });
});

// 就是说，对于这种代码，可以用特性测试进行测试，测试通过之后才对这些代码进行修改，如果没有进行测试的代码 应该避免修改
// 这适合用于 : 自己拥有覆盖率较低的大型遗留代码库 请使用特性测试一小块一小块的进行测试

// 回归测试 : 复现某个错误的测试称为回归测试
// 例如 : 有玩家反映，可以获得同一张牌的同一花色 例如5条king

describe("buildCardArray()", function() {
  it("do something ?", function() {
    wish(deepEqual(buildCardArray(), cardArray));
  });
});

describe("spliceCard()", function() {
  it("returns two things", function() {
    wish(spliceCard(buildCardArray()).length === 2);
  });
  it("returns the selected card", function() {
    wish(spliceCard(buildCardArray())[0].match(/\w{1,2}-[HDSC]/));
  });
  it("returns an array with one card gone", function() {
    wish(
      spliceCard(buildCardArray())[1].length === buildCardArray().length - 1
    );
  });
});
