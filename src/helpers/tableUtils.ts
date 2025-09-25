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

export const getRadioactiveElementTable = (elements: AtomeqElement[] = []): AtomeqElement[][] => {
  const bottomRow = groupBy(elements, 'period');

  return Object.entries(bottomRow).map(([_, value]: [string, AtomeqElement[]]) => value);
};

export default { getElementTable, getRadioactiveElementTable };
