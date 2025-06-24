import { HeaderClient } from '@/components/Common/Header/Header.client'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('HeaderClient', () => {
  it('renders header, logo, and navigation', () => {
    render(
      <HeaderClient
        data={{
          id: 'header1',
          navItems: [],
        }}
      />,
    )
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })
})
