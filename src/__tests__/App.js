import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render, fireEvent, cleanup } from '@testing-library/react'

import App from '../App'
import reducer from '../reducers/cashflow'
import { initialFormData, seedData } from '../seed'

jest.mock('../i18next', () => ({}))

let query, getByText, getByLabelText, getByTestId

beforeEach(() => {
  const store = createStore(reducer, seedData)

  query = render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  getByText = query.getByText
  getByLabelText = query.getByLabelText
  getByTestId = query.getByTestId
})

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

test('should render language buttons', () => {
  expect(getByText(/en/i, { selector: 'button' })).toBeInTheDocument()
  expect(getByText(/es/i, { selector: 'button' })).toBeInTheDocument()
})

test('should render with initial data provided', () => {
  expect(getByText(seedData[0].name)).toBeInTheDocument()
  expect(getByText(seedData[0].amount.toString())).toBeInTheDocument()
  expect(getByText(seedData[1].name)).toBeInTheDocument()
  expect(getByText(seedData[1].amount.toString())).toBeInTheDocument()
})

test('should render with initial default form', () => {
  expect(getByLabelText(/name/i).value).toBe(initialFormData.name)
  expect(getByLabelText(/amount/i).value).toBe(initialFormData.amount)
  expect(getByLabelText(/type/i).value).toBe(initialFormData.type)
  expect(getByText(/add/i)).toBeDisabled()
})

test('should render the form update on edit button', async () => {
  fireEvent.click(getByTestId('1-edit'))

  expect(getByLabelText(/name/i).value).toBe(seedData[0].name)
  expect(getByLabelText(/amount/i).value).toBe(seedData[0].amount.toString())
  expect(getByLabelText(/type/i).value).toBe(seedData[0].type)
  expect(getByText(/cancel/i)).toBeInTheDocument()
  expect(getByText(/update/i)).toBeInTheDocument()
})
