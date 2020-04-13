/**
 * 写一个程序，用于在52张扑克牌中抽取5张组成的数组
 * 它项是一个字符串 例如 Q-H 表示红线Q (queen of hearts)
 *  打印手中拍的名字(同花 straight 顺子 flush  一对 pair)
 */
var assert = require("assert");
var wish = require("wish");
// 检测是否为同花顺
checkStraightFulsh = function() {
  return false;
};
// 检测是否为四张相同的牌
checkFourOfKind = function() {
  return false;
};
// 检测是否为顺子
checkFlush = function() {
  return false;
};
// 检测是否为同花
checkStraight = function() {
  return false;
};
// 检测是否为三张相同的牌
checkTreeOfKind = function() {
  return false;
};
// 检测是否有2对
checkTwoPair = function() {
  return false;
};
// 检测是否只有一对
checkPair = function() {
  return false;
};

var checkHand = function(hand) {
  if (checkStraightFulsh(hand)) {
    return "straight flush";
  } else if (checkFourOfKind(hand)) {
    return "four of a kind";
  } else if (checkFlush(hand)) {
    return "flush";
  } else if (checkStraight(hand)) {
    return "straight";
  } else if (checkTreeOfKind(hand)) {
    return "three of a kind";
  } else if (checkTwoPair(hand)) {
    return "two pair";
  } else if (checkPair(hand)) {
    return "pair";
  } else {
    return "high card";
  }
};

console.log(
  "value of checkHand is " + checkHand(["2-H", "3-C", "4-D", "5-H", "2-C"])
);

// 传入一个数组
var getValues = function(hand) {
  console.log(hand);
  var values = {};
  for (var i = 0; i < hand.length; i++) {
    console.log(hand[i]);
    values.push(hand[i][0]);
  }
  console.log(values);
  return values;
};

// 根据传入数组
var conutDuplicates = function(values) {
  console.log("values are:" + values);
  var numberOfDuplicates = 0;
  var duplicatesOfThisCard;
  for (var i = 0; i < values.length; i++) {
    duplicatesOfThisCard = 0;
    console.log(numberOfDuplicates);
    console.log(duplicatesOfThisCard);
    if (values[i] === values[0]) {
      duplicatesOfThisCard += 1;
    }
    if (values[i] === values[1]) {
      duplicatesOfThisCard += 1;
    }
    if (values[i] === values[2]) {
      duplicatesOfThisCard += 1;
    }
    if (values[i] === values[3]) {
      duplicatesOfThisCard += 1;
    }
    if (values[i] === values[4]) {
      duplicatesOfThisCard += 1;
    }
    if (duplicatesOfThisCard > numberOfDuplicates) {
      numberOfDuplicates = duplicatesOfThisCard;
    }
  }
  return numberOfDuplicates;
};

// assert 接受两个参数 一个是断言 另一个是错误信息 ，当断言为false时，输出错误信息
// assert(
//   checkHand(["2-H", "3-C", "4-D", "5-H", "2-C"]) === "pair",
//   "这不是一对pair"
// );

wish(checkHand(["2-H", "3-C", "4-D", "5-H", "2-C"]) === "pair");

/**
 * 常见的断言与期待
 *  assert.equal(foo,'bar')
 *  expect(foo).to.equal('bar')
 *  foo.should.equal('bar')
 *  assert(foo === 'bar')   // 这种需要自己手动添加错误信息 不灵活
 *  所以我们用wish
 *  wish(foo === 'bar')
 * 另外，我们可以是mocha 他能检查test文件夹下的文件
 */
