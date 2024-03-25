//
// This is only a SKELETON file for the 'Knapsack' exercise. It's been proitemvalueded as a
// convenience to get you started writing code faster.
//

export const knapsack = (maximumWeight, items) => {
  let newArr = [];
  newArr[0] = Array(maximumWeight + 1).fill(0);
  for (let i = 1; i <= items.length; i += 1) {
    newArr[i] = Array(maximumWeight + 1);
    let item = items[i - 1];
    let itemWeight = item.weight;
    let itemValue = item.value;
    for (let j = 0; j <= maximumWeight; j += 1) {
      if (itemWeight > j) {
        newArr[i][j] = newArr[i - 1][j];
      } else {
        newArr[i][j] = Math.max(newArr[i - 1][j], itemValue + newArr[i - 1][j - itemWeight],);
      }
    }
  }
  return newArr[items.length][maximumWeight];
};
