import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'renderer/App';
import AlgorithmsProvider from 'renderer/components/providers/AlgorithmsProvider';
import FileProvider from 'renderer/components/providers/FileProvider';
import ToastsProvider from 'renderer/components/providers/ToastsProvider';
import Compose from 'renderer/Compose';
import theme from 'renderer/theme';

ReactDOM.render(
  <React.StrictMode>
    <Compose
      components={[[ThemeProvider, { theme }], ToastsProvider, FileProvider, AlgorithmsProvider]}
    >
      <App />
    </Compose>
  </React.StrictMode>,
  document.getElementById('root'),
);
