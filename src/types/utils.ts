import { AtomeqElement } from '@/types/element.ts';
import type { IAtomeqElement } from '@/types/element.ts';

export const transformElement = (element: IAtomeqElement): AtomeqElement => {
  return new AtomeqElement(element);
};

export const transformMultipleElements = (elements: IAtomeqElement[]): AtomeqElement[] => {
  return elements.map((element) => transformElement(element));
};
