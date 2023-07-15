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

  if(!totalWordCount) return null;

  const pizzaRating =
    Math.min(1, pizzaCount / totalWordCount / MAX_PIZZA_SCALE) * 5

  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 50,
        padding: "0.3rem 1rem",
        background: "white",
        border: "1px lightgray solid",
        borderRight: "none",
        borderRadius: "7px 0 0 7px",
        boxShadow: "box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;",
        color: "black"
      }}
        title={`${pizzaCount}/${totalWordCount}`}
      >
      {pizzaRating.toFixed(2)}/5 Pizzas
    </div>
  )
}

export default CustomButton
