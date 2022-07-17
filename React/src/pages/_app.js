import '../styles/globals.css'
import {ToastContainer} from 'react-toastify';
import {ChakraProvider} from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';
import {store, StoreContext} from '../stores/store';

function MyApp({Component, pageProps}) {
  return (
    <StoreContext.Provider value={store}>
      <ChakraProvider>
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-center"
          hideProgressBar={true}
          newestOnTop={true}
          draggable={false}
          theme={'dark'}
        />
      </ChakraProvider>
    </StoreContext.Provider>
  );
}

export default MyApp
