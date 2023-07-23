import React from "react"
import { keyframes, styled } from "styled-components"
import Header from "~components/typography/Header"

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const LoaderContainer = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  margin: auto;
  animation: ${rotate} 1.5s linear infinite;
`

const LoaderPart = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #cc3852;
  position: absolute;
`

type LoaderProp = { text?: string }
const Loader = (props: LoaderProp) => {
  return (
    <div>
      <LoaderContainer>
        <LoaderPart />
        <LoaderPart style={{ right: "0", bottom: "0" }} />
      </LoaderContainer>
      <Header $centered as="h3">Loading...</Header>
    </div>
  )
}

export default Loader
