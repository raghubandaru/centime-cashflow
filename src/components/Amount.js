import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Amount = ({ amount, className, type }) => {
  return (
    <span className={className} data-testid="amount">
      {amount}
    </span>
  )
}

const StyledAmount = styled(Amount)`
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;

  background: ${props => (props.type === 'income' ? '#87eaf2' : '#f29b9b')};
  color: ${props => (props.type === 'income' ? '#044e54' : '#610404')};
`

Amount.propTypes = {
  amount: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default StyledAmount
