import { useRef } from "react"
import { StyleSheetManager } from "styled-components"
import Draggable, { type DraggableEventHandler } from "react-draggable"
import { useStorage } from "@plasmohq/storage/hook"
import { useMessage } from "@plasmohq/messaging/hook"
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
  const draggableRef = useRef<Draggable>()
  const [overlayPosition, setOverlayPosition] = useStorage(
    "overlayPosition",
    (v) => (v === undefined ? 50 : v)
  )
  useMessage((req, res) => {
    res.send({
      rating,
      pizzaCount,
      totalWordCount,
      pizzaRating
    })
  })

  const onDragDropped: DraggableEventHandler = (event, data) => {
    setOverlayPosition(data.y)
    // To prevent jumping effect on drop. Update
    // the draggable position before rerender.
    draggableRef.current.props.position.y = data.y
  }

  const { rating, pizzaCount, totalWordCount } = getNodePizzaRating(
    document.body
  )

  if (!totalWordCount) return null

  const pizzaRating = parseFloat((rating * MAX_PIZZA_RATING).toFixed(1))

  // TODO: Modify title on rating value;
  const overlayTitle = `Rating ${pizzaRating}/${MAX_PIZZA_RATING} Pizzas: ${pizzaCount} pizzas in ${totalWordCount} words.`

  return (
    <StyleSheetManager target={anchor.element.firstElementChild.shadowRoot}>
      <Draggable
        ref={draggableRef}
        axis="y"
        onStop={onDragDropped}
        position={{ x: 0, y: overlayPosition }}>
        <div className="overlay" title={overlayTitle}>
          <PizzaRatingIcon rating={rating} />
        </div>
      </Draggable>
    </StyleSheetManager>
  )
}

export default PizzaRatingOverlay
