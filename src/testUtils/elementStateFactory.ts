import type { IAtomeqElementState } from '@/types/elementState.ts';
import { randMovieCharacter, randNumber } from '@ngneat/falso';

export const elementStateFactory = (
  overrides: Partial<IAtomeqElementState> = {},
): IAtomeqElementState => {
  return {
    id: randNumber(),
    name: randMovieCharacter(),
    ...overrides,
  };
};
