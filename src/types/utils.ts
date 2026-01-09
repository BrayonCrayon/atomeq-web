import { Element } from '@/types/element.ts';
import type { IElement } from '@/types/element.ts';
import { AtomeqElementType, type IElementType } from '@/types/elementType.ts';

export const transformElement = (element: IElement): Element => {
  return new Element(element);
};

export const transformMultipleElements = (elements: IElement[]): Element[] => {
  return elements.map((element) => transformElement(element));
};

export const transformElementType = (type: IElementType): AtomeqElementType => {
  return new AtomeqElementType(type);
};

export const transformElementTypes = (types: IElementType[]): AtomeqElementType[] => {
  return types.map((type) => transformElementType(type));
};
