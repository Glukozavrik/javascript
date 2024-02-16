//
// This is only a SKELETON file for the 'str Fence Cipher' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
export const encode = (string, railsCount) => {
  const rails = Array(railsCount).fill("");
  let rail = 0;
  let reverse = false;
  for (let char in string) {
    rails[rail] += string[char];
    if (!reverse){
      rail++
    } else if (reverse){
      rail--
    }
    if (rail === railsCount - 1 || rail === 0){
      reverse = !reverse;
    } 
  }
  return rails.join("");
};

export const decode = (str, rails) => {
  throw new Error('Remove this statement and implement this function');
};
