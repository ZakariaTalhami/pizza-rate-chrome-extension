import overlayStyle from "data-text:./overlay.scss"
import { PlasmoGetStyle } from "plasmo"

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = overlayStyle
  return style
}

const MAX_PIZZA_SCALE = 0.05

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

const CustomButton = () => {
  const pizzaCount = matchStringInNode(document.body, /pizza/gi)
  const totalWordCount = document.body.textContent.trim().split(" ").length

  if (!totalWordCount) return null

  const pizzaRating =
    Math.min(1, pizzaCount / totalWordCount / MAX_PIZZA_SCALE) * 5

  return (
    <div className="overlay" title={`${pizzaCount}/${totalWordCount}`}>
      {parseFloat(pizzaRating.toFixed(1))}/5 Pizzas
    </div>
  )
}

export default CustomButton
