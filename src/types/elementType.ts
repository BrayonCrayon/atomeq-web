export interface IAtomeqElementType {
  id: number;
  name: string;
}

export class AtomeqElementType implements IAtomeqElementType {
  id: number = 0;
  name: string = '';

  constructor(overrides: Partial<IAtomeqElementType> = {}) {
    Object.assign(this, overrides);
  }
}
