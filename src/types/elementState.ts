export interface IAtomeqElementState {
  id: number;
  name: string;
}

export class AtomeqElementState implements IAtomeqElementState {
  id: number = 0;
  name: string = '';

  constructor(overrides: Partial<IAtomeqElementState> = {}) {
    Object.assign(this, overrides);
  }
}

export enum AtomeqElementStateColour {
  SOLID = 'bg-lime-300',
  LIQUID = 'bg-purple-300',
  GAS = 'bg-teal-300',
}
