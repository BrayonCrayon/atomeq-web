import { describe, it, expect } from 'vitest';
import { getElementTable } from '@/helpers/tableUtils.ts';
import { elementFactory } from '@/testUtils/elementFactory.ts';
import { Element } from '@/types/element.ts';
import mockElements from '@/testUtils/mocks/mockElements.ts';

const constructExpectedArray = (): (Element | undefined)[][] => {
  return Array.from({ length: 7 }).map(() => Array.from({ length: 18 }).map(() => undefined));
};

describe('tableUtils', () => {
  it('returns an empty 2D array if nothing is passed', () => {
    const expectedBaseArray = constructExpectedArray();
    expect(getElementTable()).toEqual(expectedBaseArray);
  });

  it('will slot given element correctly in its spot', () => {
    const element = new Element(elementFactory({ group: 1, period: 1 }));
    const expectedBaseArray = constructExpectedArray();
    expectedBaseArray[0][0] = element;

    expect(getElementTable([element])).toEqual(expectedBaseArray);
  });

  it('will correctly construct the periodic table from the element data', () => {
    const elements = mockElements.data.map((item) => new Element(item));
    const expectedBaseArray = constructExpectedArray();

    for (const element of elements) {
      expectedBaseArray[element.period - 1][element.group - 1] = element;
    }

    expect(getElementTable(elements)).toEqual(expectedBaseArray);
  });
});
