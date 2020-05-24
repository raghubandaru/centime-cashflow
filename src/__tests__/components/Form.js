import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Form } from '../../components'
import { seedData, initialFormData, updatedFormData } from '../../seed'

let handleClear, handleSubmit

beforeEach(() => {
  handleClear = jest.fn()
  handleSubmit = jest.fn()
})

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

test('the form is accesible', async () => {
  const { container } = render(
    <Form edit={null} handleClear={handleClear} handleSubmit={handleSubmit} />
  )
  const accessibility = await axe(container)

  expect(accessibility.violations).toHaveLength(0)
})

test('should render form with initial Data', () => {
  const { getByText, getByLabelText } = render(
    <Form edit={null} handleClear={handleClear} handleSubmit={handleSubmit} />
  )

  expect(getByLabelText(/name/i).value).toBe(initialFormData.name)
  expect(getByLabelText(/amount/i).value).toBe(initialFormData.amount)
  expect(getByLabelText(/type/i).value).toBe(initialFormData.type)
  expect(getByText(/add/i)).toBeDisabled()
})

test('should test error messages', () => {
  const { queryByText, getByLabelText } = render(
    <Form edit={null} handleClear={handleClear} handleSubmit={handleSubmit} />
  )

  fireEvent.click(getByLabelText(/name/i))
  fireEvent.blur(getByLabelText(/name/i))

  fireEvent.click(getByLabelText(/amount/i))
  fireEvent.blur(getByLabelText(/amount/i))

  expect(queryByText(/name is required/i)).toBeInTheDocument()
  expect(queryByText(/amount is required/i)).toBeInTheDocument()

  fireEvent.change(getByLabelText(/name/i), {
    target: { value: seedData[0].name }
  })
  fireEvent.change(getByLabelText(/amount/i), {
    target: { value: seedData[0].amount.toString() }
  })

  expect(queryByText(/name is required/i)).not.toBeInTheDocument()
  expect(queryByText(/amount is required/i)).not.toBeInTheDocument()
})

test('should submit the form with right inputs', () => {
  const { name, amount, type } = seedData[0]
  const { getByText, getByLabelText } = render(
    <Form edit={null} handleClear={handleClear} handleSubmit={handleSubmit} />
  )

  fireEvent.change(getByLabelText(/name/i), {
    target: { value: name }
  })
  fireEvent.change(getByLabelText(/amount/i), {
    target: { value: amount.toString() }
  })
  fireEvent.change(getByLabelText(/type/i), {
    target: { value: type }
  })

  fireEvent.click(getByText(/add/i))

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(name, type, amount)
})

test('should render form with data provided', () => {
  const { getByText, getByLabelText } = render(
    <Form
      edit={seedData[0]}
      handleClear={handleClear}
      handleSubmit={handleSubmit}
    />
  )

  expect(getByLabelText(/name/i).value).toBe(seedData[0].name)
  expect(getByLabelText(/amount/i).value).toBe(seedData[0].amount.toString())
  expect(getByLabelText(/type/i).value).toBe(seedData[0].type)
  expect(getByText(/cancel/i)).toBeInTheDocument()
  expect(getByText(/update/i)).toBeInTheDocument()
})

test('should call the clear on cancel', () => {
  const { getByText } = render(
    <Form
      edit={seedData[0]}
      handleClear={handleClear}
      handleSubmit={handleSubmit}
    />
  )

  fireEvent.click(getByText(/cancel/i))

  expect(handleClear).toHaveBeenCalledTimes(1)
})

test('should submit and clear the updated form', () => {
  const { name, amount, type } = updatedFormData
  const { getByText, getByLabelText } = render(
    <Form
      edit={seedData[0]}
      handleClear={handleClear}
      handleSubmit={handleSubmit}
    />
  )

  fireEvent.change(getByLabelText(/name/i), {
    target: { value: name }
  })
  fireEvent.change(getByLabelText(/amount/i), {
    target: { value: amount.toString() }
  })
  fireEvent.change(getByLabelText(/type/i), {
    target: { value: type }
  })

  fireEvent.click(getByText(/update/i))

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(name, type, amount)
  expect(handleClear).toHaveBeenCalledTimes(1)
})
