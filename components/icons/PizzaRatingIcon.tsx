import PizzaIcon from "./PizzaIcon"
import styled from "styled-components"

const PizzaRatingIconContainer = styled.div`
  position: relative;
`

const PizzaRatingIndicatorIcon = styled.div`
  display: inline;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow-x: hidden;
`

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
    <PizzaRatingIconContainer>
      <PizzaIcon variant="outlined" />
      <PizzaRatingIndicatorIcon style={{ width: `${rating}%` }}>
        <PizzaIcon />
      </PizzaRatingIndicatorIcon>
    </PizzaRatingIconContainer>
  )
}

export default PizzaRatingIcon
