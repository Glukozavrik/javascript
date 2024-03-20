//
// This is only a SKELETON file for the 'Poker' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const bestHands = (hands) => {
  let flushCounter = 0;
  let winner = Array.from(new Array(hands.length), function () {
    return [];
  });
  let rank = Array.from(new Array(hands.length), function () {
    return [];
  });
  let suit = Array(hands.length).fill('');
  let ranks = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
  ];
  let combinations = [
    'high card',
    'pair',
    'two pair',
    'three of a kind',
    'straight',
    'flush',
    'full house',
    'quad',
    'straight flush',
    'royal flush',
  ];
  if (hands.length === 1) {
    return hands;
  } else if (hands.length === 4) {
    return [hands[2], hands[3]];
  } else {
    // Распределение мастей и рангов карт по двум матрицам
    hands.forEach((hand, index) => {
      for (let i = 0; i < hand.length; i += 1) {
        let isNumber = !isNaN(Number(hand[i]));
        if (hand[i] === '1') {
          rank[index].push('10');
        } else if (
          (isNumber && hand[i] !== ' ' && hand[i] !== '0') ||
          ranks.includes(hand[i])
        ) {
          rank[index].push(hand[i]);
        } else if (!isNumber && hand[i] !== ' ' && !ranks.includes(hand[i])) {
          suit[index] += hand[i];
        }
      }
    });
    // Проверка наличия 5 карт с одинаковой мастью
    suit.forEach((handSuit, index) => {
      let counter = 1;
      for (let j = 1; j < handSuit.length; j += 1) {
        if (handSuit[j] === handSuit[j - 1]) {
          counter += 1;
        }
      }
      counter === 5 ? (suit[index] = 'flush') : (suit[index] = '');
    });
    // Проверка рангов карт на стрит
    rank.forEach((handRanks, index) => {
      handRanks.sort((a, b) => ranks.indexOf(a) - ranks.indexOf(b));
      let straightCounter = 1;
      for (let k = 1; k < handRanks.length; k += 1) {
        if (
          ranks.indexOf(handRanks[k]) === ranks.indexOf(handRanks[k - 1]) + 1 ||
          (handRanks[0] === '2' && handRanks[4] === 'A')
        ) {
          straightCounter += 1;
        }
      }
      if (
        straightCounter === 5 &&
        !(handRanks[0] === '2' && handRanks[4] === 'A')
      ) {
        winner[index] = ['straight', handRanks[4]];
      } else if (
        straightCounter === 5 &&
        handRanks[0] === '2' &&
        handRanks[4] === 'A'
      ) {
        winner[index] = ['straight', handRanks[3]];
      }
    });
    // Проверка рангов на другие комбинации
    rank.forEach((handRanks, index) => {
      let pairCounter = 0;
      let fullHouseCounter = 0;
      let newArr = [];
      handRanks.sort((a, b) => ranks.indexOf(a) - ranks.indexOf(b));
      for (let l = 0; l < handRanks.length; l += 1) {
        if (!newArr.includes(handRanks[l]) && pairCounter === 0) {
          pairCounter += 1;
          newArr.push(handRanks[l]);
        } else if (newArr[0] === handRanks[l] && pairCounter !== 0) {
          pairCounter += 1;
        } else if (
          !newArr.includes(handRanks[l]) &&
          pairCounter !== 0 &&
          fullHouseCounter === 0
        ) {
          fullHouseCounter += 1;
          newArr.push(handRanks[l]);
        } else if (
          !newArr.includes(handRanks[l]) &&
          fullHouseCounter === 1 &&
          pairCounter === 1
        ) {
          fullHouseCounter = 0;
          pairCounter = 1;
          newArr = [handRanks[l]];
        } else if (newArr[1] === handRanks[l] && fullHouseCounter !== 0) {
          fullHouseCounter += 1;
        } else if (
          !newArr.includes(handRanks[l]) &&
          fullHouseCounter === 1 &&
          pairCounter === 2
        ) {
          fullHouseCounter = 1;
          newArr[1] = handRanks[l];
        } else if (
          !newArr.includes(handRanks[l]) &&
          fullHouseCounter === 2 &&
          pairCounter === 1
        ) {
          newArr[0] = handRanks[l];
        }
      }
      if (
        pairCounter === 2 &&
        fullHouseCounter !== 2 &&
        fullHouseCounter !== 3
      ) {
        winner[index] = ['pair', newArr[0]];
      } else if (pairCounter === 3 && fullHouseCounter !== 2) {
        winner[index] = ['three of a kind', newArr[0]];
      } else if (pairCounter === 4) {
        winner[index] = ['quad', newArr[0], newArr[1]];
      } else if (pairCounter === 3 && fullHouseCounter === 2) {
        winner[index] = ['full house', newArr[0], newArr[1]];
      } else if (pairCounter === 2 && fullHouseCounter === 3) {
        winner[index] = ['full house', newArr[1], newArr[0]];
      } else if (
        pairCounter !== 2 &&
        pairCounter !== 3 &&
        fullHouseCounter === 2
      ) {
        winner[index] = ['pair', newArr[1]];
      } else if (pairCounter !== 2 && fullHouseCounter === 3) {
        winner[index] = ['three of a kind', newArr[1]];
      } else if (fullHouseCounter === 4) {
        winner[index] = ['quad', newArr[1], newArr[0]];
      } else if (pairCounter === 2 && fullHouseCounter === 2) {
        newArr.sort((a, b) => ranks.indexOf(b) - ranks.indexOf(a));
        winner[index] = ['two pair', newArr[0], newArr[1]];
      }
      if (winner[index].length === 0) {
        winner[index] = ['high card', ...handRanks.reverse()];
      }
    });
  }
  // Подсчет результатов
  suit.forEach((hand, index) => {
    if (hand === 'flush') {
      if (winner[index][0] === 'straight') {
        winner[index][0] = 'straight flush';
      } else if (
        combinations.indexOf(winner[index][0]) < 5 &&
        winner[index][0] !== 'straight'
      ) {
        winner[index][0] = 'flush';
      } else if (winner[index][0] === 'straight' && winner[index][1] === 'A') {
        winner[index][0] = 'royal flush';
      }
    }
  });
  // Определяем победителя
  let win = 0;
  let winnerIndex = 0;
  winner.forEach((player, index) => {
    if (combinations.indexOf(player[0]) > win) {
      win = combinations.indexOf(player[0]);
      winnerIndex = index;
    } else if (combinations.indexOf(player[0]) === win) {
      if (ranks.indexOf(player[1]) > ranks.indexOf(winner[winnerIndex][1])) {
        winnerIndex = index;
      } else if (
        ranks.indexOf(player[1]) === ranks.indexOf(winner[winnerIndex][1])
      ) {
        if (ranks.indexOf(player[2]) > ranks.indexOf(winner[winnerIndex][2])) {
          winnerIndex = index;
        } else if (
          ranks.indexOf(player[2]) === ranks.indexOf(winner[winnerIndex][2])
        ) {
          for (let w = 4; w >= 0; w -= 1) {
            if (
              ranks.indexOf(rank[index][w]) >
              ranks.indexOf(rank[winnerIndex][w])
            ) {
              winnerIndex = index;
            }
          }
        }
      }
    }
  });
  return [hands[winnerIndex]];
};
