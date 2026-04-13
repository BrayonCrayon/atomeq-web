export interface IElementState {
  id: number;
  name: string;
}

export class ElementState implements IElementState {
  id: number = 0;
  name: string = '';

  constructor(overrides: Partial<IElementState> = {}) {
    Object.assign(this, overrides);
  }

  get colour() {
    switch (this.name) {
      case 'gas':
        return ElementStateColour.GAS;
      case 'solid':
        return ElementStateColour.SOLID;
      case 'liquid':
        return ElementStateColour.LIQUID;
      default:
        return 'bg-red-300';
    }
  }

  get highlight() {
    switch (this.name) {
      case 'gas':
        return ElementStateHoverColour.GAS;
      case 'solid':
        return ElementStateHoverColour.SOLID;
      case 'liquid':
        return ElementStateHoverColour.LIQUID;
      default:
        return 'bg-red-300';
    }
  }
}

export enum ElementStateColour {
  SOLID = 'bg-lime-300',
  LIQUID = 'bg-purple-300',
  GAS = 'bg-teal-300',
}

export enum ElementStateHoverColour {
  SOLID = 'bg-lime-400',
  LIQUID = 'bg-purple-400',
  GAS = 'bg-teal-400',
}
