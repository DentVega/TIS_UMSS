import React from 'react';
import './App.css';
import RouterMain from './router/RouterMain';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2D3540',
    },
    secondary: {
      main: red[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterMain />
    </ThemeProvider>
  );
}

export default App;
