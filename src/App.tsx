import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

import PasteTheme from 'components/common/PasteTheme';
import { SocketProvider } from 'providers/SocketProvider';
import store from 'store/index';
import { setAuthInitialization } from 'store/slices/authSlice';
import Router from './Router';
import {ToastContainer} from "react-toastify";
import CloseIcon from "./assets/icons/CloseIcon";

const token = getCookie('token');
if (token) {
  store.dispatch(setAuthInitialization(true));
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SocketProvider>
            <Router />
            <ToastContainer closeButton={(props) => (<div className="Toastify__close-button" {...props}><CloseIcon/></div>)}/>
            <PasteTheme />
          </SocketProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
