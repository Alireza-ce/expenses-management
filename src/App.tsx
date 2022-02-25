import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LoginPage from './containers/Login/login';

interface Props {
  name:string
}

function App(props:Props) {
  return (
    <Routes>
    <Route path="/" element={<LoginPage />} />
  </Routes>
  );
}

export default App;
