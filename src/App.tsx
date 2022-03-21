import { ThemeProvider as ThemeProviderMui } from '@material-ui/core';
import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Spinner from './components/loading-spinner';
import LoginPage from './containers/authentication/Login/login';
import RegisterPage from './containers/authentication/register/register';
import Dashboard from './containers/panel-layout/Dashboard/dashboard';
import { AuthProvider } from './hooks/context/AuthProvider';
import { muiTheme, theme } from './theme';
const AuthenticationPage = lazy(() => import('./containers/authentication/authentication'));
const PanelLayout = lazy(() => import('./containers/panel-layout/panel-layout'));

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
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="" element={<AuthenticationPage />}>
                <Route index element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Route>
              <Route path="/panel" element={
                <PrivateRoute>
                  <PanelLayout />
                </PrivateRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </Suspense>
        </ThemeProvider>
      </ThemeProviderMui>
    </AuthProvider>
  );
}

export default App;
