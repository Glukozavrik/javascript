//
// This is only a SKELETON file for the 'Allergies' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
let allergens = [
  'eggs',
  'peanuts',
  'shellfish',
  'strawberries',
  'tomatoes',
  'chocolate',
  'pollen',
  'cats',
];
// let allergic = [];
export class Allergies {
  constructor(input) {
    this.numb = input;
    this.allergic = []
  }

  list() {
    this.allergic.length = 0;
    for (let i = 8; i >= 0; i -= 1) {
     if (this.numb >= Math.pow(2, i)) {
        this.numb -= Math.pow(2, i);
        this.allergic.unshift(allergens[i]);
    }
    
  }
  return this.allergic;
}

  allergicTo(allergen) {
    this.list()
    return this.allergic.includes(allergen);
  }
}
