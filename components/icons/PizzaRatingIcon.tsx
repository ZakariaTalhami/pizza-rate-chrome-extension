import PizzaIcon from "./PizzaIcon"
import styled from "styled-components"
import { type SizableComponentProps } from "~components/sharedTypes"

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

type PizzaRatingIconProp = SizableComponentProps & {
  rating: number
}

const defaultPizzaRatingIconProp: PizzaRatingIconProp = {
  rating: 1
}

const PizzaRatingIcon = ({
  rating,
  size
}: PizzaRatingIconProp = defaultPizzaRatingIconProp) => {
  rating = Math.min(rating, 1) * 100

  return (
    <PizzaRatingIconContainer>
      <PizzaIcon size={size} variant="outlined" />
      <PizzaRatingIndicatorIcon style={{ width: `${rating}%` }}>
        <PizzaIcon size={size} />
      </PizzaRatingIndicatorIcon>
    </PizzaRatingIconContainer>
  )
}

export default PizzaRatingIcon
