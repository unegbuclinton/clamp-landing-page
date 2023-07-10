import type { AppProps } from 'next/app';
import '../styles/global.css';
import { Provider } from 'react-redux';
import store from '@/store';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Toaster />
    </Provider>
  );
}
