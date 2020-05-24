import React from 'react'
import { render, cleanup } from '@testing-library/react'

import CashflowItem from '../../components/CashflowItem'
import { seedData } from '../../seed'

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

test('should render the given list item with edit and delete buttons', () => {
  const { getByText, getByTestId } = render(<CashflowItem {...seedData[0]} />)

  expect(getByTestId('item-name').textContent).toBe(seedData[0].name)
  expect(getByText(/edit/i)).toBeInTheDocument()
  expect(getByText(/delete/i)).toBeInTheDocument()
})
