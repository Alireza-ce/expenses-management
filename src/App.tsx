import { ThemeProvider as ThemeProviderMui } from "@material-ui/core";
import React, { Suspense, lazy } from "react";
import {ReactQueryDevtools} from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Spinner from "./components/loading-spinner";
import LoginPage from "./containers/authentication/Login/login";
import RegisterPage from "./containers/authentication/register/register";
import Dashboard from "./containers/panel-layout/Dashboard/dashboard";
import { AuthProvider } from "./hooks/context/AuthProvider";
import store from "./redux/store";
import { muiTheme, theme } from "./theme";
import Report from "./containers/panel-layout/report/report";
const AuthenticationPage = lazy(
  () => import("./containers/authentication/authentication")
);
const PanelLayout = lazy(
  () => import("./containers/panel-layout/panel-layout")
);

const queryClient = new QueryClient();

interface Props {
  name: string;
}

export function PrivateRoute({ children }: any) {
  const currentUser = localStorage.getItem("token");
  return currentUser ? children : <Navigate to="/" />;
}

function App(props: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthProvider>
          <ThemeProviderMui theme={muiTheme}>
            <ThemeProvider theme={theme}>
              <Suspense fallback={<Spinner />}>
                <Routes>
                  <Route path="" element={<AuthenticationPage />}>
                    <Route index element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                  </Route>
                  <Route
                    path="/panel"
                    element={
                      <PrivateRoute>
                        <PanelLayout />
                      </PrivateRoute>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route path="report" element={<Report />} />
                  </Route>
                  {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
              </Suspense>
            </ThemeProvider>
          </ThemeProviderMui>
        </AuthProvider>
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
