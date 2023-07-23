// import original module declarations
import 'styled-components';

type DefaultColors = {
  primary: string;
  secondary: string;
  background: string;
}

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: DefaultColors;
    header: {
        colors: {
            default: string;
            primary: string;
            secondary: string
        }
    }
  }
}