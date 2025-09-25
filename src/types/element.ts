export interface IAtomeqElement {
  id: number;
  atomicMass: number;
  atomicNumber: number;
  atomicRadius: number;
  boilingPoint: number;
  density: string;
  electronegativity: number;
  electrons: number;
  elementStateId: number;
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
  valence: number;
}

export class AtomeqElement implements IAtomeqElement {
  atomicMass: number;
  atomicNumber: number;
  atomicRadius: number;
  boilingPoint: number;
  density: string;
  electronegativity: number;
  electrons: number;
  elementStateId: number;
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
  valence: number;

  constructor(overrides: Partial<IAtomeqElement> = {}) {
    this.atomicMass = overrides.atomicMass ?? 0;
    this.atomicNumber = overrides.atomicNumber ?? 0;
    this.atomicRadius = overrides.atomicRadius ?? 0;
    this.boilingPoint = overrides.boilingPoint ?? 0;
    this.density = overrides.density ?? '';
    this.electronegativity = overrides.electronegativity ?? 0;
    this.electrons = overrides.electrons ?? 0;
    this.elementStateId = overrides.elementStateId ?? 0;
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
    this.valence = overrides.valence ?? 0;
  }
}
