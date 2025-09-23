import type { AtomeqElement } from '@/types/element.ts';
import { groupBy } from 'lodash';

export const getElementTable = (
  elements: AtomeqElement[] = [],
): (AtomeqElement | undefined)[][] => {
  const base: (AtomeqElement | undefined)[][] = Array.from({ length: 7 }).map(() =>
    Array.from({ length: 18 }).map(() => undefined),
  );

  for (const element of elements) {
    base[element.period - 1][element.group - 1] = element;
  }

  return base;
};

export const getRadioactiveElementTable = (
  elements: AtomeqElement[] = [],
): (AtomeqElement | undefined)[][] => {
  const base: (AtomeqElement | undefined)[][] = Array.from({ length: 2 }).map(() =>
    Array.from({ length: 14 }).map(() => undefined),
  );

  console.log(
    'elements',
    elements.map((item) => ({
      group: item.group,
      period: item.period,
      atomicNum: item.atomicNumber,
    })),
  );

  const bottomRow = groupBy(elements, 'period');

  // group from 3 to 16
  // period 6 and 7
  // is data inconsistent? LA has group, CE has group 0
  // the data is shifted, LR (#103) took place of LA(#57)

  // WIP - are they in order?
  console.log('in a base loop, bottom row', bottomRow);

  for (const element of elements) {
    let index = 3;
    base[element.period - 1][index] = element;
    index++;
  }

  return base;
};

export default { getElementTable, getRadioactiveElementTable };
