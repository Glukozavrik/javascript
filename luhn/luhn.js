//
// This is only a SKELETON file for the 'Luhn' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const valid = (numbers) => {
  numbers = numbers.replace(/\s+/g, '').split('');
  const newArr = [];
  let multiNum = 0;
  let counter = 0;
  if (numbers.length < 2) {
    return false;
  }
  for (let i = numbers.length - 2; i >= 0; i -= 2) {
    multiNum = 0;
    if (numbers[i] !== undefined) {
      multiNum = numbers[i] * 2;
      newArr.unshift(Number(numbers[i + 1]));
      if (multiNum > 9) {
        newArr.unshift(multiNum - 9);
      } else {
        newArr.unshift(multiNum);
      }
    }
  }
  newArr.forEach((numb) => {
    if (typeof numb === 'number') {
      counter += numb;
    } else {
      counter += 0.1;
    }
  });
  return (Number.isInteger(counter / 10));
};

