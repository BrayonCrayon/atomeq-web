import { describe, expect, it, Mocked, vi } from 'vitest'
import useElements from '@/composables/useElements'
import api from '@/router/api'
import { elementFactory } from '@/testUtils/elementFactory'

vi.mock('@/router/api')
const apiService = api as Mocked<typeof api>

describe("useElements", () => {
  it('will get all elements coming from the backend endpoint', async () => {
    // TODO: create a factory for this and use falso library for it
    // TODO: fix this - should return an [{}]
    const elementsData = elementFactory()
    apiService.fetchElements.mockResolvedValue({ data: elementsData })

    const {getElements, elements} = useElements();

    await getElements()

    expect(api.fetchElements).toHaveBeenCalled()
    expect(elements.value).toEqual(elementsData)
  })

  it('will handle errors gracefully', async () => {
    apiService.fetchElements.mockRejectedValue({ message: 'bad data' })
    using spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const {getElements, elements} = useElements();

    await getElements()

    expect(spy).toHaveBeenCalled()
    expect(elements.value).toEqual([])
  })
})
