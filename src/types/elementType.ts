export interface IElementType {
  id: number;
  name: string;
  parentId: number | null;
}

export class AtomeqElementType implements IElementType {
  id: number = 0;
  name: string = '';
  parentId: number | null = null;

  constructor(overrides: Partial<IElementType> = {}) {
    Object.assign(this, overrides);
  }
}

export enum ElementTypeColour {
  NONMETAL = 'bg-emerald-300',
  NOBLE_GAS = 'bg-indigo-300',
  ALKALI_METAL = 'bg-rose-300',
  ALKALINE_EARTH_METAL = 'bg-orange-300',
  METALLOID = 'bg-cyan-300',
  HALOGEN = 'bg-sky-300',
  METAL = 'bg-zinc-300',
  TRANSITION_METAL = 'bg-blue-300',
  LANTHANIDE = 'bg-violet-300',
  ACTINIDE = 'bg-fuchsia-300',
  TRANSACTINIDE = 'bg-amber-300',
}
