import { ThemeProvider as MUIThemeProvider, ThemeOptions, createTheme, useTheme } from "@mui/material";
import { useMemo } from "react";

declare module '@mui/material/styles' {
  interface TypeBackground {
    neutral?: string;
  }
}

export interface PaletterThemeProviderProps {
  children: JSX.Element;
}

export default function PaletterThemeProvider({ children }: PaletterThemeProviderProps){
  const defaultTheme = useTheme();

  const themeOptions = useMemo<ThemeOptions>(() => ({
    ...defaultTheme,
    palette: {
      ...defaultTheme.palette,
      background: {
        ...defaultTheme.palette.background,
        neutral: '#F4F6F8'
      }
    }
  }), []);

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      {children}
    </MUIThemeProvider>
  )
}