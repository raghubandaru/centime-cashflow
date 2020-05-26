import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'

import CashflowItem from '../../components/CashflowItem'
import { seedData } from '../../seed'

let query, getByText, getByTestId, handleDelete, setEdit

beforeEach(() => {
  handleDelete = jest.fn()
  setEdit = jest.fn()

  query = render(
    <CashflowItem
      {...seedData[0]}
      handleDelete={handleDelete}
      setEdit={setEdit}
    />
  )

  getByText = query.getByText
  getByTestId = query.getByTestId
})

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

test('should render the given list item with edit and delete buttons', () => {
  expect(getByTestId('item-name').textContent).toBe(seedData[0].name)
  expect(getByText(/edit/i)).toBeInTheDocument()
  expect(getByText(/delete/i)).toBeInTheDocument()
})

test('should call setEdit with its data on edit', () => {
  fireEvent.click(getByText(/edit/i))

  expect(setEdit).toHaveBeenCalledTimes(1)
  expect(setEdit).toHaveBeenCalledWith(seedData[0])
})

test('should call handleDelete with its id on delete', () => {
  fireEvent.click(getByText(/delete/i))

  expect(handleDelete).toHaveBeenCalledTimes(1)
  expect(handleDelete).toHaveBeenCalledWith(seedData[0].id)
})
