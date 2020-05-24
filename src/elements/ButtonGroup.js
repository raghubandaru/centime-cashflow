import styled from 'styled-components'

import { below } from '../utilities/breakpoints'

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  & > * {
    margin-right: 1rem;
  }

  ${below.small`
    flex-direction: column;

    & > * {
      margin-right: 0;
      margin-bottom: .5rem;
    }
  `}
`

export { ButtonGroup }
