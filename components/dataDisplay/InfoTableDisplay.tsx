import React from "react"
import { styled } from "styled-components"
import Header from "~components/typography/Header"

const InfoTableDisplayContainer = styled.div`
  display: grid;
  column-gap: 1rem;
  grid-template-columns: 3fr 2fr;
`

type InfoTableData = Record<string, string>
type InfoTableDisplayProp = {
  data: InfoTableData
}

const InfoTableDisplay = ({ data }: InfoTableDisplayProp) => {
  return (
    <InfoTableDisplayContainer>
      {Object.keys(data).map((labelText, index) => (
        <React.Fragment key={index}>
          <Header as="h3">{labelText}</Header>
          <Header as="h3">{data[labelText]}</Header>
        </React.Fragment>
      ))}
    </InfoTableDisplayContainer>
  )
}

export default InfoTableDisplay
