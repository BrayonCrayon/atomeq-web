import { elementTypeFactory } from '@/testUtils/elementTypeFactory.ts';
import { describe, it, expect, vi } from 'vitest';
import { elementFactory } from '@/testUtils/elementFactory.ts';
import { AtomeqElement } from '@/types/element.ts';
import { AtomeqElementState } from '@/types/elementState.ts';
import { AtomeqElementType } from '@/types/elementType.ts';

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

  it("will calculate the element's colour based off of it's type", () => {
    const typeFact = elementTypeFactory({ name: 'Metal' });
    const colour = 'red';

    const elementFact = elementFactory({ type: typeFact });
    const element = new AtomeqElement(elementFact);
    const elementColour = element.calculateColour();

    expect(elementColour).toEqual(colour);
  });
});
