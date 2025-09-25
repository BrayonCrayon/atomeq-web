import { elementFactory } from '@/testUtils/elementFactory.ts';
import { AtomeqElement } from '@/types/element.ts';
import { transformElement } from '@/types/utils.ts';
import { describe, expect, it } from 'vitest';

describe('Utils', () => {
  it('will transform element data into a class', () => {
    const element = elementFactory();

    const elementClass = transformElement(element);

    expect(elementClass).toBeInstanceOf(AtomeqElement);
  });
});
