import NotistackProvider from 'src/modules/@shared/providers/notistack-provider';
import Router from './routes';

function App() {
  return (
    <NotistackProvider>
      <Router />
    </NotistackProvider>
  );
}

export default App;