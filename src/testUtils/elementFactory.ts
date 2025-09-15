import {
  randAirportName,
  randAlpha,
  randAlphaNumeric,
  randBoolean,
  randFloat,
  randNumber,
} from '@ngneat/falso'
import type {IElement} from "@/types/element.ts";

export const elementFactory = (overrides: Partial<IElement> = {}) => {
  return {
      atomicMass: randFloat({fraction: 4}),
      atomicNumber: randNumber({min: 1, max: 118}),
      atomicRadius: randFloat({fraction: 4}),
      boilingPoint: randFloat({fraction: 4}),
      density: randAlphaNumeric(),
      electronegativity: randFloat({fraction: 1}),
      electrons: randNumber({min: 1, max: 20}),
      elementStateId: randNumber({min: 1, max: 5}),
      firstIonization: randFloat({fraction: 4}),
      group: randNumber({min: 1, max: 20}),
      id: randNumber({min: 1, max: 20000}),
      isotopes: randNumber({min: 1, max: 20}),
      meltingPoint: randFloat({min: 1, max: 115, fraction: 2}),
      metal: randBoolean(),
      metalloid: randBoolean(),
      name: randAirportName(),
      natural: randBoolean(),
      neutrons: randNumber({min: 1, max: 20}),
      period: randNumber({min: 1, max: 20}),
      protons: randNumber({min: 1, max: 20}),
      radioactive: randBoolean(),
      shells: randNumber({min: 1, max: 20}),
      specificHeat: randNumber({min: 1, max: 100}),
      symbol: randAlpha(),
      typeId: randNumber({min: 1, max: 3}),
      valence: randNumber({min: 1, max: 20}),
    ...overrides,
  }
}
