import filledPizzaIcon from "data-base64:~assets/pizza.png"
import outlinePizzaIcon from "data-base64:~assets/pizza-outline.png"
import styled, { css } from "styled-components"
import { ComponentSize, SizableComponentProps } from "~components/sharedTypes"

type IconVariant = "filled" | "outlined"
type PizzaIconProp = { variant?: IconVariant } & SizableComponentProps

const defaultPizzaIconProp: PizzaIconProp = { variant: "filled" }

const sizeStyles = (size: ComponentSize = "m") =>
  ({
    s: css`
      width: 16px;
    `,
    m: css`
      width: 24px;
    `,
    l: css`
      width: 32px;
    `,
    xl: css`
      width: 48px;
    `
  })[size]

const PizzaIconImg = styled.img.attrs<SizableComponentProps>((props) => ({
  size: props.size || "m"
}))`
  display: block;
  ${({ size }) => sizeStyles(size)}
  align-self: center;
  user-select: none;
`
// Map Between Variant and the Icon Data
const pizzaIconVariantMap: Record<IconVariant, string> = {
  filled: filledPizzaIcon,
  outlined: outlinePizzaIcon
}

const PizzaIcon = ({
  variant = "filled",
  size
}: PizzaIconProp = defaultPizzaIconProp) => {
  return (
    <PizzaIconImg
      size={size}
      draggable="false"
      src={pizzaIconVariantMap[variant]}
    />
  )
}

export default PizzaIcon
