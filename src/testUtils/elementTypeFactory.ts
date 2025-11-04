import type { IAtomeqElementType } from '@/types/elementType.ts';
import { randCow, randNumber } from '@ngneat/falso';

export const elementTypeFactory = (
  overrides: Partial<IAtomeqElementType> = {},
): IAtomeqElementType => {
  return {
    id: randNumber(),
    name: randCow(),
    ...overrides,
  };
};
