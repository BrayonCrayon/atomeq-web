import { elementStateFactory } from '@/testUtils/elementStateFactory.ts';
import { elementTypeFactory } from '@/testUtils/elementTypeFactory.ts';
import { describe, expect, it } from 'vitest';
import { elementFactory } from '@/testUtils/elementFactory.ts';
import { Element, ElementBlock, ElementBlockColour } from '@/types/element.ts';
import { ElementState, ElementStateColour } from '@/types/elementState.ts';
import { AtomeqElementType, ElementTypeColour } from '@/types/elementType.ts';
import { elements as mockElements } from '@/testUtils/mocks/mockElements.ts';

describe('element', () => {
  it('will setup element states and types properly', () => {
    const element = elementFactory();

    const result = new Element(element);

    expect(result.elementState).toBeInstanceOf(ElementState);
    expect(result.type).toBeInstanceOf(AtomeqElementType);
  });

  it('will initialize element state and type with values when provided', () => {
    const element = elementFactory();

    const result = new Element(element);

    expect(result.elementState!.id).toEqual(element.elementState!.id);
    expect(result.elementState!.name).toEqual(element.elementState!.name);
    expect(result.type!.id).toEqual(element.type!.id);
    expect(result.type!.name).toEqual(element.type!.name);
  });

  it.each([
    ['metal', ElementTypeColour.METAL],
    ['nonmetal', ElementTypeColour.NONMETAL],
    ['noble-gas', ElementTypeColour.NOBLE_GAS],
    ['alkali-metal', ElementTypeColour.ALKALI_METAL],
    ['alkaline-earth-metal', ElementTypeColour.ALKALINE_EARTH_METAL],
    ['metalloid', ElementTypeColour.METALLOID],
    ['halogen', ElementTypeColour.HALOGEN],
    ['transition-metal', ElementTypeColour.TRANSITION_METAL],
    ['lanthanide', ElementTypeColour.LANTHANIDE],
    ['actinide', ElementTypeColour.ACTINIDE],
    ['transactinide', ElementTypeColour.TRANSACTINIDE],
  ])("will calculate the element's colour based off of it's type of %s", (elementType, colour) => {
    const typeFact = elementTypeFactory({ name: elementType });

    const elementFact = elementFactory({ type: typeFact });
    const element = new Element(elementFact);
    const elementColour = element.typeColour;

    expect(elementColour).toEqual(colour);
  });

  it.each([
    ['gas', ElementStateColour.GAS],
    ['solid', ElementStateColour.SOLID],
    ['liquid', ElementStateColour.LIQUID],
  ])(
    "will calculate the element's colour based off of it's state of %s",
    (elementState, colour) => {
      const stateFact = elementStateFactory({ name: elementState });

      const elementFact = elementFactory({ elementState: stateFact });
      const element = new Element(elementFact);
      const elementColour = element.stateColour;

      expect(elementColour).toEqual(colour);
    },
  );

  it.each([
    [ElementBlock.S, [1, 2], ElementBlockColour[ElementBlock.S], 14],
    [ElementBlock.P, [13, 14, 15, 16, 17, 18], ElementBlockColour[ElementBlock.P], 36],
    [ElementBlock.D, [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], ElementBlockColour[ElementBlock.D], 38],
  ])(
    'will determine an element(s) block colour by group for block %s',
    (elementBlock, groups, colour, elementCount) => {
      let elements = mockElements.data
        .filter(
          (item) =>
            groups.includes(item.group) ||
            (elementBlock === ElementBlock.S && item.atomicNumber === 2),
        )
        .filter((item) => {
          return !(item.atomicNumber >= 57 && item.atomicNumber <= 71);
        })
        .filter((item) => {
          return !(item.atomicNumber >= 89 && item.atomicNumber <= 103);
        })
        .map((item) => new Element(item));

      if (elementBlock === ElementBlock.P) {
        elements = elements.filter((item) => item.atomicNumber !== 2);
      }

      expect(elements).toHaveLength(elementCount);
      elements.forEach((element) => {
        expect(element.blockColour).toEqual(colour);
      });
    },
  );

  it('will identify hydrogen and helium elements as block S for its colour', () => {
    const hydrogen = new Element(mockElements.data[0]);
    const helium = new Element(mockElements.data[1]);

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
      .map((item) => new Element(item));

    detachedRows.forEach((element) => {
      expect(element.blockColour).toEqual(ElementBlockColour[ElementBlock.F]);
    });
  });
});
