import Compose from '@kobionic/react-compose';
import { ThemeProvider } from '@material-ui/core/styles';
import AlgorithmsProvider from 'components/providers/AlgorithmsProvider';
import FileProvider from 'components/providers/FileProvider';
import ToastsProvider from 'components/providers/ToastsProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import theme from 'theme';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Compose
      components={[
        { component: ThemeProvider, props: { theme } },
        ToastsProvider,
        FileProvider,
        AlgorithmsProvider,
      ]}
    >
      <App />
    </Compose>
  </React.StrictMode>,
  document.getElementById('root'),
);
