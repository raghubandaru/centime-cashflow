import styled from 'styled-components'

import { below } from '../utilities/breakpoints'

const DataContainer = styled.div`
  font-size: 1.4rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;

  ${below.med`
    flex-direction: column;
  `}
`

export { DataContainer }
