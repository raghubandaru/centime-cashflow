import React from 'react'
import { render, cleanup } from '@testing-library/react'

import { ErrorMessage } from '../../components'

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

test('should render the error given', () => {
  const error = 'Name is required'
  const { getByTestId } = render(<ErrorMessage error={error} />)

  expect(getByTestId('error').textContent).toBe(error)
})
