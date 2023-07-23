import styled, { css, DefaultTheme } from "styled-components"

type HeaderColorThemeOptions = keyof DefaultTheme["header"]["colors"]

type HeaderProp = {
  $centered?: boolean
  as?: "h1" | "h2" | "h3" | "h4" | "h5"
  $ellipsis?: boolean
  title?: string
  color?: HeaderColorThemeOptions
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

const getCssColor = (
  theme: DefaultTheme,
  color: HeaderColorThemeOptions
) => css`
  color: ${theme.header.colors[color]};
`

const Header = styled.h1.attrs<HeaderProp>((props) => ({
  $centered: props.$centered || false,
  $ellipsis: props.$ellipsis || false,
  title: props.$ellipsis && props.children.toString(),
  as: props.as || "h1",
  color: props.color || "default"
}))`
  ${({ $centered }) => $centered && centeredHeaderCss}
  ${({ $ellipsis }) => $ellipsis && ellipsisCss}
  ${({ color, theme }) => getCssColor(theme, color)}
`

export default Header
