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

  get colour() {
    switch (this.name) {
      case 'nonmetal':
        return ElementTypeColour.NONMETAL;
      case 'noble-gas':
        return ElementTypeColour.NOBLE_GAS;
      case 'alkali-metal':
        return ElementTypeColour.ALKALI_METAL;
      case 'alkaline-earth-metal':
        return ElementTypeColour.ALKALINE_EARTH_METAL;
      case 'metalloid':
        return ElementTypeColour.METALLOID;
      case 'halogen':
        return ElementTypeColour.HALOGEN;
      case 'metal':
        return ElementTypeColour.METAL;
      case 'transition-metal':
        return ElementTypeColour.TRANSITION_METAL;
      case 'lanthanide':
        return ElementTypeColour.LANTHANIDE;
      case 'actinide':
        return ElementTypeColour.ACTINIDE;
      case 'transactinide':
        return ElementTypeColour.TRANSACTINIDE;
      default:
        return 'bg-red-300';
    }
  }

  // TODO: adjust OR even better! think of a way to hover; opacity?
  get highlight() {
    switch (this.name) {
      case 'nonmetal':
        return ElementTypeColour.NONMETAL;
      case 'noble-gas':
        return ElementTypeColour.NOBLE_GAS;
      case 'alkali-metal':
        return ElementTypeColour.ALKALI_METAL;
      case 'alkaline-earth-metal':
        return ElementTypeColour.ALKALINE_EARTH_METAL;
      case 'metalloid':
        return ElementTypeColour.METALLOID;
      case 'halogen':
        return ElementTypeColour.HALOGEN;
      case 'metal':
        return ElementTypeColour.METAL;
      case 'transition-metal':
        return ElementTypeColour.TRANSITION_METAL;
      case 'lanthanide':
        return ElementTypeColour.LANTHANIDE;
      case 'actinide':
        return ElementTypeColour.ACTINIDE;
      case 'transactinide':
        return ElementTypeColour.TRANSACTINIDE;
      default:
        return 'bg-red-300';
    }
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
