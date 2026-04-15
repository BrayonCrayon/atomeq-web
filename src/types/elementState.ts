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
      case 'artificial':
        return ElementStateColour.ARTIFICIAL;
      default:
        return 'bg-yellow-300';
    }
  }

  get highlight() {
    switch (this.name) {
      case 'gas':
        return ElementStateHighlightColour.GAS;
      case 'solid':
        return ElementStateHighlightColour.SOLID;
      case 'liquid':
        return ElementStateHighlightColour.LIQUID;
      case 'artificial':
        return ElementStateHighlightColour.ARTIFICIAL;
      default:
        return 'bg-yellow-300';
    }
  }

  get hover() {
    switch (this.name) {
      case 'gas':
        return ElementStateHoverColour.GAS;
      case 'solid':
        return ElementStateHoverColour.SOLID;
      case 'liquid':
        return ElementStateHoverColour.LIQUID;
      case 'artificial':
        return ElementStateHoverColour.ARTIFICIAL;
      default:
        return 'bg-yellow-300';
    }
  }
}

export enum ElementStateColour {
  SOLID = 'bg-lime-300',
  LIQUID = 'bg-purple-300',
  GAS = 'bg-teal-300',
  ARTIFICIAL = 'bg-red-300',
}

export enum ElementStateHoverColour {
  SOLID = 'hover:bg-lime-400',
  LIQUID = 'hover:bg-purple-400',
  GAS = 'hover:bg-teal-400',
  ARTIFICIAL = 'hover:bg-red-400',
}

export enum ElementStateHighlightColour {
  SOLID = 'bg-lime-400',
  LIQUID = 'bg-purple-400',
  GAS = 'bg-teal-400',
  ARTIFICIAL = 'bg-red-400',
}
