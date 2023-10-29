import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './modules/@shared/providers/theme-provider';
import ModalProvider from './modules/@shared/providers/modal/modal-provider';
import { Provider as ReduxProvider } from 'react-redux';
import { store, persistor } from './redux/store';
import { HelmetProvider } from 'react-helmet-async';
import PaletterThemeProvider from './modules/@shared/providers/palette-theme-provider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ReduxProvider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <HelmetProvider>
          <ModalProvider>
            <ThemeProvider>
              <PaletterThemeProvider>
                <LocalizationProvider
                  adapterLocale={ptBR}
                  dateAdapter={AdapterDateFns}
                  localeText={{ cancelButtonLabel: 'Cancelar' }}>
                  <App />
                </LocalizationProvider>
              </PaletterThemeProvider>
            </ThemeProvider>
          </ModalProvider>
        </HelmetProvider>
      </BrowserRouter>
    </PersistGate>
  </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();