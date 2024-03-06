//
// This is only a SKELETON file for the 'Dominoes' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const chain = (dominoes) => {
  let chained = [];
  if (dominoes.length === 0) {
    return dominoes;
  } else if (dominoes.length === 1) {
    return dominoes[0][0] === dominoes[0][1] ? dominoes : null;
  } else {
    chained.push(dominoes[dominoes.length - 1]);
    dominoes.pop();
    for (let i = 0; i <= dominoes.length + 2; i += 1) {
      dominoes.forEach((rock, index) => {
        if (rock[0] === chained[chained.length - 1][1]) {
          chained.push(rock);
          dominoes.splice(index, 1);
        } else if (rock[1] === chained[0][0]) {
          chained.unshift(rock);
          dominoes.splice(index, 1);
        } else if (rock[1] === chained[chained.length - 1][1]) {
          chained.push(rock.reverse());
          dominoes.splice(index, 1);
        } else if (rock[0] === chained[0][0]) {
          chained.unshift(rock.reverse());
          dominoes.splice(index, 1);
        }
      });
    }
  }
  let chain =
    dominoes.length === 0
      ? chained[0][0] === chained[chained.length - 1][1]
        ? dominoes
        : null
      : null;
  return chain;
};
