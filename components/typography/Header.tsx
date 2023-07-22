import styled, { css } from "styled-components"

type HeaderProp = {
  $centered?: boolean
  as?: "h1" | "h2" | "h3" | "h4" | "h5"
}

const Header = styled.h1.attrs<HeaderProp>((props) => ({
  $centered: props.$centered || false,
  as: props.as || "h1"
}))`
  ${({ $centered }) =>
    $centered &&
    css`
      align-self: center;
    `};
`

export default Header
