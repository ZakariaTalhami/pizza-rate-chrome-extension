import styled, { css } from "styled-components"

type HeaderProp = {
  $centered?: boolean
  as?: "h1" | "h2" | "h3" | "h4" | "h5"
  $ellipsis?: boolean
  title?: string
}

const ellipsisCss = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`

const centeredHeaderCss = css`
  align-self: center;
  text-align: center;
`

const Header = styled.h1.attrs<HeaderProp>((props) => ({
  $centered: props.$centered || false,
  $ellipsis: props.$ellipsis || false,
  title: props.$ellipsis && props.children.toString(),
  as: props.as || "h1"
}))`
  ${({ $centered }) => $centered && centeredHeaderCss}
  ${({ $ellipsis }) => $ellipsis && ellipsisCss}
`

export default Header
