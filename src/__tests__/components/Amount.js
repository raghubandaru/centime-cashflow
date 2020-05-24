import React from 'react'
import { render, cleanup } from '@testing-library/react'

import Amount from '../../components/Amount'
import { seedData } from '../../seed'

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

test('should render the amount given', () => {
  const { amount, type } = seedData[0]
  const { getByTestId } = render(<Amount amount={amount} type={type} />)

  expect(getByTestId('amount').textContent).toBe(amount.toString())
})
