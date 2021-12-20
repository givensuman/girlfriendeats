import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
    max-width: 100%;
`

const _Wrapper = ({ children }) => <Wrapper>{children}</Wrapper>

export default _Wrapper