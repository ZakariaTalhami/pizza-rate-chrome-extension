import { MAX_PIZZA_SCALE } from "./constants"

type PizzaRatingStats = {
  pizzaCount: number
  totalWordCount: number
  rating: number
}

/**
 *
 * @param node DOM Node
 * @param exp Search Expression, Either string or regex
 * @returns number of occurrences of expression
 */
export function matchStringInNode(node: Node, exp: RegExp | string) {
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

/**
 *
 * @param node DOM Node
 * @returns Nubmer of words in the node's text content
 */
export function getNodeWordCount(node: Node): number {
  return node.textContent.trim().split(" ").length
}

/**
 *
 * @param node DOM Node
 * @returns Pizza Rating of node's text content
 */
export function getNodePizzaRating(node: Node): PizzaRatingStats | null {
  const pizzaCount = matchStringInNode(node, /pizza/gi)
  const totalWordCount = getNodeWordCount(node)

  if (!totalWordCount) return null

  const rating = Math.min(1, pizzaCount / totalWordCount / MAX_PIZZA_SCALE)

  return {
    pizzaCount,
    totalWordCount,
    rating
  }
}
