import React from 'react'
import { render, cleanup } from '@testing-library/react'

import { CashflowList } from '../../components/CashflowList'
import { seedData } from '../../seed'

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

test('should render no items found when there is no data', () => {
  const handleOperations = jest.fn()
  const { getByText } = render(
    <CashflowList handleOperations={handleOperations} />
  )

  expect(getByText(/no cashflow items found/i)).toBeInTheDocument()
})

test('should render data when provided', () => {
  const handleOperations = jest.fn()
  const { getAllByTestId } = render(
    <CashflowList data={seedData} handleOperations={handleOperations} />
  )
  const itemNames = getAllByTestId('item-name').map(li => li.textContent)
  const fakeDataNames = seedData.map(item => item.name)

  expect(fakeDataNames).toEqual(itemNames)
})
