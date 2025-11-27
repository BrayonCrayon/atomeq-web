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
}

export enum ElementStateColour {
  SOLID = 'bg-lime-300',
  LIQUID = 'bg-purple-300',
  GAS = 'bg-teal-300',
}
