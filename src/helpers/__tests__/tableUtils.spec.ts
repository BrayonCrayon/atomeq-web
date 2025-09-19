import { describe, it, expect } from 'vitest'
import {getElementTable} from "@/helpers/tableUtils.ts";

describe ('tableUtils', () => {
  it('returns an empty 2D array if nothing is passed', () => {
    expect(getElementTable()).toEqual([])
  })
})
