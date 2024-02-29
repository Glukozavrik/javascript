//
// This is only a SKELETON file for the 'Robot Simulator' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const directions = ['north', 'east', 'south', 'west'];
export class InvalidInputError extends Error {
  constructor(message) {
    super();
    this.message = message || 'Invalid Input';
  }
}

export class Robot {
  bearing = 'north'

  coordinates = [0, 0]

  get bearing() {
    return this.bearing;
  }

  get coordinates() {
    return this.coordinates;
  }

  place({ x, y, direction }) {
    if (directions.includes(direction)) {
      this.bearing = direction;
      this.coordinates = [x, y];
    } else {
      throw new InvalidInputError();
    }
  }

  turnRigth() {
    switch (this.bearing) {
      case 'north':
        this.bearing = 'east';
        break;

      case 'east':
        this.bearing = 'south';
        break;

      case 'south':
        this.bearing = 'west';
        break;

      case 'west':
        this.bearing = 'north';
        break;
    }
  }

  turnLeft() {
    switch (this.bearing) {
      case 'north':
        this.bearing = 'west';
        break;

      case 'east':
        this.bearing = 'north';
        break;

      case 'south':
        this.bearing = 'east';
        break;

      case 'west':
        this.bearing = 'south';
        break;
    }
  }

  advance() {
    switch (this.bearing) {
      case 'north':
        this.coordinates = [this.coordinates[0], this.coordinates[1] + 1];
        break;

      case 'east':
        this.coordinates = [this.coordinates[0] + 1, this.coordinates[1]];
        break;

      case 'south':
        this.coordinates = [this.coordinates[0], this.coordinates[1] - 1];
        break;

      case 'west':
        this.coordinates = [this.coordinates[0] - 1, this.coordinates[1]];
        break;
    }
  }

  evaluate(instructions) {
    instructions.split('').forEach((letter) => {
      switch (letter) {
        case 'R':
          this.turnRigth();
          break;
        case 'L':
          this.turnLeft();
          break;
        case 'A':
          this.advance();
          break;
      }
    });
  }
}
