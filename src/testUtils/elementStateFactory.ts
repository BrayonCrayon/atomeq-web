import type { IElementState } from '@/types/elementState.ts';
import { randMovieCharacter, randNumber } from '@ngneat/falso';

export const elementStateFactory = (overrides: Partial<IElementState> = {}): IElementState => {
  return {
    id: randNumber(),
    name: randMovieCharacter(),
    ...overrides,
  };
};
