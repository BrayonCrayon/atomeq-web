import { elementStateFactory } from '@/testUtils/elementStateFactory.ts';
import { elementTypeFactory } from '@/testUtils/elementTypeFactory.ts';
import { describe, expect, it } from 'vitest';
import { elementFactory } from '@/testUtils/elementFactory.ts';
import { AtomeqElement, ElementBlock, ElementBlockColour } from '@/types/element.ts';
import { AtomeqElementState, AtomeqElementStateColour } from '@/types/elementState.ts';
import { AtomeqElementType, AtomeqElementTypeColour } from '@/types/elementType.ts';
import mockElements from '@/testUtils/mocks/mockElements.ts';

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

  it.each([
    ['metal', AtomeqElementTypeColour.METAL],
    ['nonmetal', AtomeqElementTypeColour.NONMETAL],
    ['noble-gas', AtomeqElementTypeColour.NOBLE_GAS],
    ['alkali-metal', AtomeqElementTypeColour.ALKALI_METAL],
    ['alkaline-earth-metal', AtomeqElementTypeColour.ALKALINE_EARTH_METAL],
    ['metalloid', AtomeqElementTypeColour.METALLOID],
    ['halogen', AtomeqElementTypeColour.HALOGEN],
    ['transition-metal', AtomeqElementTypeColour.TRANSITION_METAL],
    ['lanthanide', AtomeqElementTypeColour.LANTHANIDE],
    ['actinide', AtomeqElementTypeColour.ACTINIDE],
    ['transactinide', AtomeqElementTypeColour.TRANSACTINIDE],
  ])("will calculate the element's colour based off of it's type of %s", (elementType, colour) => {
    const typeFact = elementTypeFactory({ name: elementType });

    const elementFact = elementFactory({ type: typeFact });
    const element = new AtomeqElement(elementFact);
    const elementColour = element.typeColour;

    expect(elementColour).toEqual(colour);
  });

  it.each([
    ['gas', AtomeqElementStateColour.GAS],
    ['solid', AtomeqElementStateColour.SOLID],
    ['liquid', AtomeqElementStateColour.LIQUID],
  ])(
    "will calculate the element's colour based off of it's state of %s",
    (elementState, colour) => {
      const stateFact = elementStateFactory({ name: elementState });

      const elementFact = elementFactory({ elementState: stateFact });
      const element = new AtomeqElement(elementFact);
      const elementColour = element.stateColour;

      expect(elementColour).toEqual(colour);
    },
  );

  // TODO: something ain't quite right here
  it.each([
    [ElementBlock.S, [1, 2], ElementBlockColour[ElementBlock.S]],
    [ElementBlock.P, [13, 14, 15, 16, 17, 18], ElementBlockColour[ElementBlock.P]],
    [ElementBlock.D, [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], ElementBlockColour[ElementBlock.D]],
  ])('will determine an element(s) block colour by group for block %s', (_, groups, colour) => {
    const elements = mockElements.data
      .filter((item) => groups.includes(item.group))
      .filter((item) => {
        return item.atomicNumber < 57 && item.atomicNumber > 71;
      })
      .filter((item) => {
        return item.atomicNumber < 89 && item.atomicNumber > 103;
      })
      .map((item) => new AtomeqElement(item));

    elements.forEach((element) => {
      expect(element.blockColour).toEqual(colour);
    });
  });

  it('will identify hydrogen and helium elements as block S for its colour', () => {
    const hydrogen = new AtomeqElement(mockElements.data[0]);
    const helium = new AtomeqElement(mockElements.data[1]);

    expect(hydrogen.blockColour).toEqual(ElementBlockColour[ElementBlock.S]);
    expect(helium.blockColour).toEqual(ElementBlockColour[ElementBlock.S]);
  });

  it('will identify elements that are detached and in an atomic number range of (57-71) or (89-103)', () => {
    const detachedRows = mockElements.data
      .filter((item) => {
        return (
          (item.atomicNumber <= 71 && item.atomicNumber >= 57) ||
          (item.atomicNumber >= 89 && item.atomicNumber <= 103)
        );
      })
      .map((item) => new AtomeqElement(item));

    detachedRows.forEach((element) => {
      expect(element.blockColour).toEqual(ElementBlockColour[ElementBlock.F]);
    });
  });
});
