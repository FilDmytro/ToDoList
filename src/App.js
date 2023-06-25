import React from 'react';
import styled from "styled-components";
import { Main } from './components';
import './App.css';

function App() {
  return (
    <AppWrapperStyled className="App">
      <Main />
    </AppWrapperStyled>
  );
}

const AppWrapperStyled = styled.div({
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  width: 'auto',
  height: "auto",
  minHeight: "100vh",
  background: "silver",
  padding: "0px",
  margin: "0px",
  outline: "none",
});


export default App;
