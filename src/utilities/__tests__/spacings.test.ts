import { describe, expect, it } from 'vitest'
import { getSpacing, getSpacings } from '../spacings'

describe('getSpacing', () => {
  it('returns correct top padding class', () => {
    const result = getSpacing('sm', true)
    expect(result).toBe('pt-4')
  })

  it('returns correct bottom padding class', () => {
    const result = getSpacing('md', false)
    expect(result).toBe('pb-8')
  })

  it('returns empty string when spacing is undefined', () => {
    const result = getSpacing(undefined as any, true)
    expect(result).toBe('')
  })

  it('returns empty string when spacing is null', () => {
    const result = getSpacing(null as any, true)
    expect(result).toBe('')
  })
})

describe('getSpacings', () => {
  it('returns combined spacing classes for top and bottom', () => {
    const result = getSpacings({
      spacingTop: 'sm',
      spacingBottom: 'md',
    })
    expect(result).toBe('pt-4 pb-8')
  })

  it('returns only top spacing class when bottom is undefined', () => {
    const result = getSpacings({
      spacingTop: 'lg',
      spacingBottom: undefined,
    })
    expect(result).toBe('pt-16')
  })

  it('returns only bottom spacing class when top is undefined', () => {
    const result = getSpacings({
      spacingTop: undefined,
      spacingBottom: 'lg',
    })
    expect(result).toBe('pb-16')
  })

  it('returns empty string when both spacings are undefined', () => {
    const result = getSpacings({
      spacingTop: undefined,
      spacingBottom: undefined,
    })
    expect(result).toBe('')
  })

  it('returns empty string when spacings object is empty', () => {
    const result = getSpacings({} as any)
    expect(result).toBe('')
  })

  it('returns empty string when spacings is null or undefined', () => {
    expect(getSpacings(null as any)).toBe('')
    expect(getSpacings(undefined as any)).toBe('')
  })
})
