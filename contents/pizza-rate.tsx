import overlayStyle from "data-text:./overlay.scss"
import filledPizzaIcon from "data-base64:~assets/pizza.png"
import outlinePizzaIcon from "data-base64:~assets/pizza-outline.png"
import type { PlasmoGetStyle } from "plasmo"

const MAX_PIZZA_SCALE = 0.05
const MAX_PIZZA_RATING = 5

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = overlayStyle
  return style
}

function matchStringInNode(node: Node, exp: RegExp | string) {
  let matchCount = 0
  node.childNodes.forEach((node) => {
    if (node.nodeName === "SCRIPT") return
    if (node.childNodes.length) {
      matchCount += matchStringInNode(node, exp)
    } else {
      const matches = node?.textContent.match(exp)
      if (matches) {
        matchCount += matches.length
      }
    }
  })

  return matchCount
}

type IconVariant = "filled" | "outlined"
type PizzaIconProp = { variant?: IconVariant }
const defaultPizzaIconProp: PizzaIconProp = { variant: "filled" }
const pizzaIconVariantMap: Record<IconVariant, string> = {
  filled: filledPizzaIcon,
  outlined: outlinePizzaIcon
}
const PizzaIcon = ({
  variant = "filled"
}: PizzaIconProp = defaultPizzaIconProp) => {
  return <img src={pizzaIconVariantMap[variant]} className="pizzaIcon" />
}

type PizzaRatingIconProp = {
  rating: number
}
const defaultPizzaRatingIconProp: PizzaRatingIconProp = {
  rating: 1
}
const PizzaRatingIcon = ({
  rating
}: PizzaRatingIconProp = defaultPizzaRatingIconProp) => {
  rating = Math.min(rating, 1) * 100

  return (
    <div className="pizzaRatingIcon">
      <PizzaIcon variant="outlined" />
      <div className="pizzaRatingIconTop" style={{ width: `${rating}%` }}>
        <PizzaIcon />
      </div>
    </div>
  )
}

const PizzaRatingOverlay = () => {
  const pizzaCount = matchStringInNode(document.body, /pizza/gi)
  const totalWordCount = document.body.textContent.trim().split(" ").length

  if (!totalWordCount) return null

  const rating = Math.min(1, pizzaCount / totalWordCount / MAX_PIZZA_SCALE)
  const pizzaRating = rating * MAX_PIZZA_RATING
  // TODO: Modify title on rating value;
  const overlayTitle = `Rating ${parseFloat(pizzaRating.toFixed(1))}/${MAX_PIZZA_RATING} Pizzas: ${pizzaCount} pizzas in ${totalWordCount} words.`

  return (
    <div className="overlay" title={overlayTitle}>
      <PizzaRatingIcon rating={rating} />
    </div>
  )
}

export default PizzaRatingOverlay
