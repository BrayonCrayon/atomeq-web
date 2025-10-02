import { elementStateFactory } from '@/testUtils/elementStateFactory.ts';
import { elementTypeFactory } from '@/testUtils/elementTypeFactory.ts';
import { describe, it, expect, vi } from 'vitest';
import { elementFactory } from '@/testUtils/elementFactory.ts';
import { AtomeqElement } from '@/types/element.ts';
import { AtomeqElementState, AtomeqElementStateColour } from '@/types/elementState.ts';
import { AtomeqElementTypeColour, AtomeqElementType } from '@/types/elementType.ts';

describe('element', () => {
  it('will setup element states and types properly', () => {
    const element = elementFactory();

    const result = new AtomeqElement(element);

    expect(result.elementState).toBeInstanceOf(AtomeqElementState);
    expect(result.type).toBeInstanceOf(AtomeqElementType);
  });

  it('will initialize element state and type with values when provided', () => {
    const element = elementFactory();

    const result = new AtomeqElement(element);

    expect(result.elementState!.id).toEqual(element.elementState!.id);
    expect(result.elementState!.name).toEqual(element.elementState!.name);
    expect(result.type!.id).toEqual(element.type!.id);
    expect(result.type!.name).toEqual(element.type!.name);
  });

  it.each([['Metal', AtomeqElementTypeColour.METAL]])(
    "will calculate the element's colour based off of it's type",
    (elementType, colour) => {
      const typeFact = elementTypeFactory({ name: elementType });

      const elementFact = elementFactory({ type: typeFact });
      const element = new AtomeqElement(elementFact);
      const elementColour = element.typeColour;

      expect(elementColour).toEqual(colour);
    },
  );

  it.each([
    ['Gas', AtomeqElementStateColour.GAS],
    ['Solid', AtomeqElementStateColour.SOLID],
    ['Liquid', AtomeqElementStateColour.LIQUID],
  ])("will calculate the element's colour based off of it's state", (elementState, colour) => {
    const stateFact = elementStateFactory({ name: elementState });

    const elementFact = elementFactory({ elementState: stateFact });
    const element = new AtomeqElement(elementFact);
    const elementColour = element.stateColour;

    expect(elementColour).toEqual(colour);
  });
});
