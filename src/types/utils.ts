import { Element } from '@/types/element.ts';
import type { IElement } from '@/types/element.ts';

export const transformElement = (element: IElement): Element => {
  return new Element(element);
};

export const transformMultipleElements = (elements: IElement[]): Element[] => {
  return elements.map((element) => transformElement(element));
};
