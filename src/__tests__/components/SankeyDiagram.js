import React from 'react'
import { render, cleanup } from '@testing-library/react'

import { SankeyDiagram } from '../../components'

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

test('should not render Sankey diagram when no or empty data provided', () => {
  const { getByText } = render(<SankeyDiagram data={[]} />)
  expect(getByText(/no cashflow items found/i)).toBeInTheDocument()
})
