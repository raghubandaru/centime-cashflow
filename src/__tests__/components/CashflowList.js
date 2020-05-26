import React from 'react'
import { render, cleanup } from '@testing-library/react'

import { CashflowList } from '../../components/CashflowList'
import { seedData } from '../../seed'

let handleDelete, setEdit

beforeEach(() => {
  handleDelete = jest.fn()
  setEdit = jest.fn()
})

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

test('should render no items found when there is no data', () => {
  const { getByText } = render(
    <CashflowList setEdit={setEdit} handleDelete={handleDelete} />
  )

  expect(getByText(/no cashflow items found/i)).toBeInTheDocument()
})

test('should render data when provided', () => {
  const { getAllByTestId } = render(
    <CashflowList
      data={seedData}
      setEdit={setEdit}
      handleDelete={handleDelete}
    />
  )
  const itemNames = getAllByTestId('item-name').map(li => li.textContent)
  const fakeDataNames = seedData.map(item => item.name)

  expect(fakeDataNames).toEqual(itemNames)
})
