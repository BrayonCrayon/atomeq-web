import { AtomeqElementType, type IElementType } from '@/types/elementType.ts';
import { ElementState, type IElementState } from '@/types/elementState.ts';

export enum ElementBlock {
  S = 's',
  P = 'p',
  D = 'd',
  F = 'f',
}

export const ElementBlockColour = {
  [ElementBlock.S]: 'bg-blue-300',
  [ElementBlock.P]: 'bg-violet-300',
  [ElementBlock.D]: 'bg-fuchsia-300',
  [ElementBlock.F]: 'bg-zinc-300',
};

export const ElementBlockColourHighlight = {
  [ElementBlock.S]: 'bg-blue-400',
  [ElementBlock.P]: 'bg-violet-400',
  [ElementBlock.D]: 'bg-fuchsia-400',
  [ElementBlock.F]: 'bg-zinc-400',
};

export const ElementBlockColourHover = {
  [ElementBlock.S]: 'hover:bg-blue-400',
  [ElementBlock.P]: 'hover:bg-violet-400',
  [ElementBlock.D]: 'hover:bg-fuchsia-400',
  [ElementBlock.F]: 'hover:bg-zinc-400',
};

export interface IElement {
  id: number;
  atomicMass: number;
  atomicNumber: number;
  atomicRadius: number;
  boilingPoint: number;
  density: string;
  electronegativity: number;
  electrons: number;
  elementStateId: number;
  elementState: IElementState | undefined;
  firstIonization: number;
  group: number;
  isotopes: number;
  meltingPoint: number;
  metal: boolean;
  metalloid: boolean;
  name: string;
  natural: boolean;
  neutrons: number;
  period: number;
  protons: number;
  radioactive: boolean;
  shells: number;
  specificHeat: number;
  symbol: string;
  typeId: number;
  type: IElementType | undefined;
  valence: number;
}

export type IElementKey = keyof Element;

export class Element implements IElement {
  atomicMass: number;
  atomicNumber: number;
  atomicRadius: number;
  boilingPoint: number;
  density: string;
  electronegativity: number;
  electrons: number;
  elementStateId: number;
  elementState: ElementState | undefined;
  firstIonization: number;
  group: number;
  id: number;
  isotopes: number;
  meltingPoint: number;
  metal: boolean;
  metalloid: boolean;
  name: string;
  natural: boolean;
  neutrons: number;
  period: number;
  protons: number;
  radioactive: boolean;
  shells: number;
  specificHeat: number;
  symbol: string;
  typeId: number;
  type: AtomeqElementType | undefined;
  valence: number;

  constructor(overrides: Partial<IElement> = {}) {
    this.atomicMass = overrides.atomicMass ?? 0;
    this.atomicNumber = overrides.atomicNumber ?? 0;
    this.atomicRadius = overrides.atomicRadius ?? 0;
    this.boilingPoint = overrides.boilingPoint ?? 0;
    this.density = overrides.density ?? '';
    this.electronegativity = overrides.electronegativity ?? 0;
    this.electrons = overrides.electrons ?? 0;
    this.elementStateId = overrides.elementStateId ?? 0;
    this.elementState = overrides.elementState
      ? new ElementState(overrides.elementState)
      : undefined;
    this.firstIonization = overrides.firstIonization ?? 0;
    this.group = overrides.group ?? 0;
    this.id = overrides.id ?? 0;
    this.isotopes = overrides.isotopes ?? 0;
    this.meltingPoint = overrides.meltingPoint ?? 0;
    this.metal = overrides.metal ?? false;
    this.metalloid = overrides.metalloid ?? false;
    this.name = overrides.name ?? '';
    this.natural = overrides.natural ?? false;
    this.neutrons = overrides.neutrons ?? 0;
    this.period = overrides.period ?? 0;
    this.protons = overrides.protons ?? 0;
    this.radioactive = overrides.radioactive ?? false;
    this.shells = overrides.shells ?? 0;
    this.specificHeat = overrides.specificHeat ?? 0;
    this.symbol = overrides.symbol ?? '';
    this.typeId = overrides.typeId ?? 0;
    this.type = overrides.type ? new AtomeqElementType(overrides.type) : undefined;
    this.valence = overrides.valence ?? 0;
  }

  get typeColour(): string {
    return this.type?.colour ?? 'bg-red-900';
  }

  get stateColour(): string {
    return this.elementState?.colour ?? 'bg-red-300';
  }

  get block(): string {
    if ([1, 2].includes(this.group) || [1, 2].includes(this.atomicNumber)) {
      return ElementBlock.S;
    }

    if ([13, 14, 15, 16, 17, 18].includes(this.group)) {
      return ElementBlock.P;
    }

    if (
      [3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(this.group) &&
      (this.atomicNumber < 57 || this.atomicNumber > 71) &&
      (this.atomicNumber < 89 || this.atomicNumber > 103)
    ) {
      return ElementBlock.D;
    }

    return ElementBlock.F;
  }

  get blockColour(): string {
    if ([1, 2].includes(this.group) || [1, 2].includes(this.atomicNumber)) {
      return ElementBlockColour[ElementBlock.S];
    }

    if ([13, 14, 15, 16, 17, 18].includes(this.group)) {
      return ElementBlockColour[ElementBlock.P];
    }

    if (
      [3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(this.group) &&
      (this.atomicNumber < 57 || this.atomicNumber > 71) &&
      (this.atomicNumber < 89 || this.atomicNumber > 103)
    ) {
      return ElementBlockColour[ElementBlock.D];
    }

    return ElementBlockColour[ElementBlock.F];
  }
}
