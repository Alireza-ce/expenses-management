import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AuthenticationPage from './containers/authentication/authentication';
import LoginPage from './containers/authentication/Login/login';
import RegisterPage from './containers/authentication/register/register';
import { AuthProvider } from './hooks/context/AuthProvider';

interface Props {
  name: string
}

function App(props: Props) {
  return (
    <AuthProvider>
      <Routes>
        <Route path="" element={<AuthenticationPage />}>
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
