const seedData = [
  {
    id: 1,
    name: 'Salary',
    type: 'income',
    amount: 30000
  },
  {
    id: 2,
    name: 'Groceries',
    type: 'expenditure',
    amount: 4000
  }
]

const initialFormData = {
  name: '',
  amount: '',
  type: 'income'
}

const updatedFormData = {
  id: 1,
  name: 'Stocks',
  type: 'income',
  amount: 10000
}

export { seedData, initialFormData, updatedFormData }
