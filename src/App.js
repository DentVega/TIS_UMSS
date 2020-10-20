import React from 'react';
import './App.css';
import RouterMain from './router/RouterMain';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import red from '@material-ui/core/colors/red';
import { colorMain } from './constants/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colorMain,
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
