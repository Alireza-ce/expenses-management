import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthenticationPage from './containers/authentication/authentication';
import LoginPage from './containers/authentication/Login/login';
import RegisterPage from './containers/authentication/register/register';
import DashboardPage from './containers/Dashboard/dashboard';
import { AuthProvider, useAuth } from './hooks/context/AuthProvider';

interface Props {
  name: string
}

export function PrivateRoute({ children }: any) {
  const currentUser = localStorage.getItem('token')
  return currentUser ? children : <Navigate to="/" />;
}

function App(props: Props) {
  return (
    <AuthProvider>
      <Routes>
        <Route path="" element={<AuthenticationPage />}>
          <Route index element={<LoginPage />} />
          <Route path="register" element={RegisterPage} />
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
    </AuthProvider>
  );
}

export default App;
