import wrapper from '@/redux';
import PropTypes from 'prop-types';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/global';
import { theme } from '../styles/theme';
import Layout from '../components/layout';

export const metadata = {
  title: 'Blog',
  description:
    '리액트를 처음 배우는 개발자를 위한 기초부터 심화까지의 과정을 담은 페이지',
};

function App({ Component, pageProps }: AppProps) {
  const currentPathName = usePathname();

  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <main>
          <GlobalStyle />
          <Layout currentPathName={currentPathName}>
            <NextNProgress
              color="#155B82"
              startPosition={0.3}
              height={4}
              showOnShallow={true}
            />
            <Component {...props} />
          </Layout>
        </main>
      </ThemeProvider>
    </Provider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
