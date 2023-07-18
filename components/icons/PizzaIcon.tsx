import filledPizzaIcon from "data-base64:~assets/pizza.png"
import outlinePizzaIcon from "data-base64:~assets/pizza-outline.png"
import styled from "styled-components"

const PizzaIconImg = styled.img`
  width: 24px;
  align-self: center;
  user-select: none;
`

type IconVariant = "filled" | "outlined"
type PizzaIconProp = { variant?: IconVariant }

const defaultPizzaIconProp: PizzaIconProp = { variant: "filled" }

// Map Between Variant and the Icon Data
const pizzaIconVariantMap: Record<IconVariant, string> = {
  filled: filledPizzaIcon,
  outlined: outlinePizzaIcon
}

const PizzaIcon = ({
  variant = "filled"
}: PizzaIconProp = defaultPizzaIconProp) => {
  return <PizzaIconImg draggable="false" src={pizzaIconVariantMap[variant]} />
}

export default PizzaIcon
