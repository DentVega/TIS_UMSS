import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import TestReducer from './components/TestReducer';
function App(props) {
  const { tab } = props.configReducerX;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
            Tab number: {tab}
        </p>
        <TestReducer/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => ({
    configReducerX: state.configReducer
});

export default connect(mapStateToProps)(App);
