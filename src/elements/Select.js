import styled from 'styled-components'

const Select = styled.select`
  background: #f0f4f8;
  padding: 1rem 2rem;
  border: none;
  line-height: inherit;
  width: 100%;

  &:focus {
    box-shadow: 0 0 0 3px rgba(118, 169, 250, 0.45);
    outline: none;
  }
`

export { Select }
