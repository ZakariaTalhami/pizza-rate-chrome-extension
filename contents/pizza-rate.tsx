import { StyleSheetManager } from "styled-components"
// Types
import type { PlasmoGetStyle, PlasmoCSUIProps } from "plasmo"
// Assets
import overlayStyle from "data-text:./overlay.scss"
// Components
import PizzaRatingIcon from "~components/icons/PizzaRatingIcon"
import { getNodePizzaRating } from "~core/pizzaCalculations"
import { MAX_PIZZA_RATING } from "~core/constants"

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.setAttribute("data-styled", "")
  style.textContent = overlayStyle
  return style
}

const PizzaRatingOverlay = ({ anchor }: PlasmoCSUIProps) => {
  const { rating, pizzaCount, totalWordCount } = getNodePizzaRating(
    document.body
  )

  if (!totalWordCount) return null

  const pizzaRating = parseFloat((rating * MAX_PIZZA_RATING).toFixed(1))

  // TODO: Modify title on rating value;
  const overlayTitle = `Rating ${pizzaRating}/${MAX_PIZZA_RATING} Pizzas: ${pizzaCount} pizzas in ${totalWordCount} words.`

  return (
    <StyleSheetManager target={anchor.element.firstElementChild.shadowRoot}>
      <div className="overlay" title={overlayTitle}>
        <PizzaRatingIcon rating={rating} />
      </div>
    </StyleSheetManager>
  )
}

export default PizzaRatingOverlay
