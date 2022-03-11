import { ThemeProvider as ThemeProviderMui } from '@material-ui/core';
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import AuthenticationPage from './containers/authentication/authentication';
import LoginPage from './containers/authentication/Login/login';
import RegisterPage from './containers/authentication/register/register';
import DashboardPage from './containers/Dashboard/dashboard';
import { AuthProvider } from './hooks/context/AuthProvider';
import { muiTheme, theme } from './theme';

interface Props {
  name: string
}

export function PrivateRoute({ children }: any) {
  const currentUser = localStorage.getItem('token');
  return currentUser ? children : <Navigate to="/" />;
}

function App(props: Props) {
  return (
    <AuthProvider>
      <ThemeProviderMui theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="" element={<AuthenticationPage />}>
              <Route index element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </ThemeProvider>
      </ThemeProviderMui>
    </AuthProvider>
  );
}

export default App;
