import { StyleSheetManager } from "styled-components"
// Types
import type { PlasmoGetStyle, PlasmoCSUIProps } from "plasmo"
// Assets
import overlayStyle from "data-text:./overlay.scss"
// Components
import PizzaRatingIcon from "~components/icons/PizzaRatingIcon"

const MAX_PIZZA_SCALE = 0.05
const MAX_PIZZA_RATING = 5

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.setAttribute("data-styled", "")
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

const PizzaRatingOverlay = ({ anchor }: PlasmoCSUIProps) => {
  const pizzaCount = matchStringInNode(document.body, /pizza/gi)
  const totalWordCount = document.body.textContent.trim().split(" ").length

  if (!totalWordCount) return null

  const rating = Math.min(1, pizzaCount / totalWordCount / MAX_PIZZA_SCALE)
  const pizzaRating = rating * MAX_PIZZA_RATING
  // TODO: Modify title on rating value;
  const overlayTitle = `Rating ${parseFloat(
    pizzaRating.toFixed(1)
  )}/${MAX_PIZZA_RATING} Pizzas: ${pizzaCount} pizzas in ${totalWordCount} words.`

  return (
    <StyleSheetManager target={anchor.element.firstElementChild.shadowRoot}>
      <div className="overlay" title={overlayTitle}>
        <PizzaRatingIcon rating={rating} />
      </div>
    </StyleSheetManager>
  )
}

export default PizzaRatingOverlay
