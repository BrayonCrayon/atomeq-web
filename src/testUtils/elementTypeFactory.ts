import type { IElementType } from '@/types/elementType.ts';
import { randCow, randNumber } from '@ngneat/falso';

export const elementTypeFactory = (overrides: Partial<IElementType> = {}): IElementType => {
  return {
    id: randNumber(),
    name: randCow(),
    parentId: randNumber(),
    ...overrides,
  };
};
