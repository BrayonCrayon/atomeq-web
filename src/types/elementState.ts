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
