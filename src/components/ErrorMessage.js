import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'

function ErrorMessage({ className, error }) {
  return (
    <span className={className} data-testid="error">
      {error}
    </span>
  )
}

const StyledErrorMessage = styled(ErrorMessage)`
  background: #f29b9b;
  border-radius: 100px;
  color: #610404;
  padding: 5px 8px;
  margin-top: 5px;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
`

ErrorMessage.propTypes = {
  className: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired
}

export { StyledErrorMessage as ErrorMessage }
