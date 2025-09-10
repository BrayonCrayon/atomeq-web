import { describe, expect, it, vi } from 'vitest'
import useElements from '@/composables/useElements'
import api from '@/router/api'
import { flushPromises } from '@vue/test-utils'

vi.mock('@/router/api.ts')

describe("useElements", () => {
  it('will get all elements coming from the backend endpoint', async () => {
    // Arrange
    // TODO: create a factory for this and use falso library for it
    const elementsData = [
      {
        atomicMass: 1.007,
        atomicNumber: 1,
        atomicRadius: 0.79,
        boilingPoint: 20.28,
        density: "8.99E-05",
        electronegativity: 2.2,
        electrons: 1,
        elementStateId: 1,
        firstIonization: 13.5984,
        group: 1,
        id: 1,
        isotopes: 3,
        meltingPoint: 14.175,
        metal: false,
        metalloid: false,
        name: "Hydrogen",
        natural: true,
        neutrons: 0,
        period: 1,
        protons: 1,
        radioactive: false,
        shells: 1,
        specificHeat: 14,
        symbol: "H",
        typeId: 1,
        valence: 1,
      }
    ]
    api.fetchElements.mockResolvedValue(() => ({ data: elementsData }))
    // mockImplementation

    // mock out the request that reaches to the backend

    // Act
    const {getElements, elements} = useElements();

    getElements()
    await flushPromises()

    // Assert
    // apiCall was called
    // it brought back the data that we expected
    expect(api.fetchElements).toHaveBeenCalled()
    expect(elements.value).toEqual(elementsData)
  })
})
