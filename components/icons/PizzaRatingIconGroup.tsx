import styled from "styled-components"
import PizzaRatingIcon from "./PizzaRatingIcon"

const PizzaRatingIconGroupContainer = styled.div`
  display: flex;
  min-width: 350px;
  justify-content: center;
`

type PizzaRatingIconGroupProp = {
  rating: number
  numberOfPizzas: number
}

const PizzaRatingIconGroup = ({
  rating,
  numberOfPizzas
}: PizzaRatingIconGroupProp) => {
  let normalizedRating = rating * numberOfPizzas
  const subdividedPizzaRatings = []
  for (let i = 0; i < numberOfPizzas; i++) {
    const subRatingValue = Math.min(1, normalizedRating)
    subdividedPizzaRatings.push(subRatingValue)
    normalizedRating = Math.max(normalizedRating - subRatingValue, 0)
  }

  return (
    <PizzaRatingIconGroupContainer>
      {subdividedPizzaRatings.map((subRating, index) => (
        <PizzaRatingIcon size="xl" rating={subRating} key={index} />
      ))}
    </PizzaRatingIconGroupContainer>
  )
}

export default PizzaRatingIconGroup
