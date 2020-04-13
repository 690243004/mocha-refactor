var wish = require("wish");
var deepEqual = require("deep-equal");
function checkHand(hand) {
  if(isTwoPair(hand)){
    return 'two pair'
  }
  else if (isPair(hand)) {
    return "pair";
  } else if (isFullHouse(hand)) {
    return "full house";
  }  else if (isTriple(hand)) {
    return "three of a kind";
  } else if (isQuadruple(hand)) {
    return "four of a kind";
  } else if (isStraightFlush(hand)) {
    return "straight flush";
  } else if (isFlush(hand)) {
    return "flush";
  } else if (isStraight(hand)) {
    return "straight";
  } else {
    return "high card"; // 连一对都没有
  }
}

function mutiplesIn(hand) {
  return highestCount(valuesFromHand(hand));
}

/**
 * 计算数组中数字出现最高的次数
 * @param {number[]} values
 */
function highestCount(values) {
  var counts = {};
  values.forEach(value => {
    if (counts[value] === undefined) {
      counts[value] = 1;
    } else {
      counts[value]++;
    }
  });
  var totalCount = Object.keys(counts).map(key => counts[key]);
  return totalCount.sort((a, b) => b - a)[0];
}

/**
 * 将传入的['2-H',....]这样的数组
 * 返回它的实际数字组成的数组
 * @param {string[]} hand
 */
function valuesFromHand(hand) {
  return hand.map(card => parseInt(card.split("-")[0]));
}

// 返回花色
function suitsFor(hand) {
  return hand.map(card => card.split("-")[1]);
}

function allTheSameSuit(suits) {
  return suits.every(suit => suit === suits[0]);
}

// 是否只有一对
function isPair(hand) {
  return mutiplesIn(hand) === 2;
}

// 是否是三张
function isTriple(hand) {
  return mutiplesIn(hand) === 3;
}
// 是否是金刚
function isQuadruple(hand) {
  return mutiplesIn(hand) === 4;
}

// 是否为花
function isFlush(hand) {
  return allTheSameSuit(suitsFor(hand));
}

// 检查是否是顺子
function isStraight(hand) {
  return cardsInSequence(valuesFromHand(hand));
}

// 是否为同花顺
function isStraightFlush(hand) {
  return isStraight(hand) && isFlush(hand);
}

// 检查是否是顺子 只要将values数组按照升序排序后，最后一个数组项减去第一个数组项 并数组没有重复的元素，即是顺子
function cardsInSequence(values) {
  var sortedValues = values.sort();
  return fourAway(sortedValues) && noMultiples(values);
}

// 检测数组最后一项减去地一项是否为4
function fourAway(values) {
  return +values[values.length - 1] - 4 - +values[0] === 0;
}

// 数组元素最高重复次数为1
function noMultiples(values) {
  return highestCount(values) === 1;
}

// 获取手牌所有点数
function allCounts(values) {
  var counts = {};
  values.forEach(value => {
    if (counts[value] === undefined) {
      counts[value] = 1;
    } else {
      counts[value]++;
    }
  });
  var totalCount = Object.keys(counts).map(key => counts[key]);
  return totalCount.sort((a, b) => b - a);
}

// 是否是三带一对 
function isFullHouse(hand) {
  var theCounts = allCounts(valuesFromHand(hand));
  return theCounts[0] === 3 && theCounts[1] === 2;
}

function isTwoPair(hand) { 
  var theCounts = allCounts(valuesFromHand(hand));
  return theCounts[0] === 2 && theCounts[1] === 2;
}

// 高级测试 : 检查手牌单元测试
describe("checkHand()", function() {
  it("handles pairs", function() {
    var result = checkHand(["2-H", "3-C", "4-D", "5-H", "2-C"]);
    wish(result === "pair");
  });
  it("handles three of a kind", function() {
    var result = checkHand(["3-H", "3-C", "3-D", "5-H", "2-C"]);
    wish(result === "three of a kind");
  });
  it("handles four of a kind", function() {
    var result = checkHand(["3-H", "3-C", "3-D", "3-H", "2-C"]);
    wish(result === "four of a kind");
  });
  it("handles flush", function() {
    var result = checkHand(["2-H", "5-H", "9-H", "7-H", "3-H"]);
    wish(result === "flush");
  });
  it("handles high card", function() {
    var result = checkHand(["2-H", "5-C", "9-D", "7-S", "3-H"]);
    wish(result === "high card");
  });
  it("handles straight flush", function() {
    var result = checkHand(["1-H", "2-H", "3-H", "4-H", "5-H"]);
    wish(result === "straight flush");
  });
  it("handles full house", function() {
    var result = checkHand(["1-H", "1-D", "1-S", "4-H", "4-D"]);
    wish(result === "full house");
  });
  it("handles two pair", function() {
    var result = checkHand(["1-H", "1-D", "2-S", "2-H", "4-D"]);
    wish(result === "two pair");
  });
});

// 以下是低级测试
// 获取手牌点数数组
describe("valuesFromHand()", function() {
  it("returns just the values  from a hand", function() {
    var result = valuesFromHand(["2-H", "3-C", "4-D", "5-H", "2-C"]);
    wish(deepEqual(result, [2, 3, 4, 5, 2]));
  });
});

// 获取手牌点数相同的 最高次数
describe("highestCount()", function() {
  it("return counts of the most common card from array", function() {
    var result = highestCount([2, 4, 4, 4, 2]);
    wish(result === 3);
  });
});

// 是否为同一花色 例如大葵 黑桃 红桃 方块
describe("allTheSameSuit()", function() {
  it("reports true if elements are the same", function() {
    var result = allTheSameSuit(["D", "D", "D", "D", "D"]);
    wish(result);
  });
});

describe("fourAway()", function() {
  it("reports true if first and last are 4 away", function() {
    var result = fourAway(["2", "6"]);
    wish(result);
  });
});

describe("noMultiples()", function() {
  it("reports true when all elements are different", function() {
    var result = noMultiples(["2", "6"]);
    wish(result);
  });
  it("reports false when all elements are same", function() {
    var result = noMultiples(["2", "2"]);
    wish(!result);
  });
});
