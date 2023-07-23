import { DefaultTheme } from "styled-components"
import { DefaultColors } from "./theme"

const defaultColors: DefaultColors = {
  primary: "#B52A04",
  secondary: "#7EA92C",
  background: "#F8EFD9"
}

const defaultTheme: DefaultTheme = {
  colors: defaultColors,
  header: {
    colors: {
      default: "black",
      primary: defaultColors.primary,
      secondary: defaultColors.secondary
    }
  }
}

export default defaultTheme
