import { ptBR } from '@mui/material/locale';
import { CssBaseline, ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material";

export interface ThemeProviderProps {
  children?: JSX.Element;
}

const theme = createTheme({}, ptBR)

export default function ThemeProvider({ children }: ThemeProviderProps){
  return (
    <MUIThemeProvider theme={theme}>
      <>
        <CssBaseline />
        {children}
      </>
    </MUIThemeProvider>
  )
}

// export interface MyBoxProps {
//   def: number;
// }

// type MyBoxClassKey = "root" | "bottom";

// declare module "@mui/material/styles" {
//   interface Components {
//     MyBox?: {
//       defaultProps?: Partial<MyBoxProps>;
//       styleOverrides?: Partial<
//         OverridesStyleRules<MyBoxClassKey, "MyBox", Theme>
//       >;
//       variants?: Array<{
//         props: Partial<MyBoxProps>;
//         style: Interpolation<{ theme: Theme }>;
//       }>
//     };
//   }
// }