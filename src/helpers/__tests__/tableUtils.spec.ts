import { describe, it, expect } from 'vitest';
import { getElementTable } from '@/helpers/tableUtils.ts';
import { elementFactory } from '@/testUtils/elementFactory.ts';
import { AtomeqElement } from '@/types/element.ts';

describe('tableUtils', () => {
  it('returns an empty 2D array if nothing is passed', () => {
    expect(getElementTable()).toEqual([]);
  });

  it('will slot given element correctly in its spot', () => {
    const element = elementFactory({ group: 1, period: 1 });
    const expectedBaseArray: (AtomeqElement | undefined)[][] = Array.from({ length: 7 }).map(() =>
      Array.from({ length: 18 }).map(() => undefined),
    );
    expectedBaseArray[0][0] = element;

    expect(getElementTable([element])).toEqual(expectedBaseArray);
  });
});
