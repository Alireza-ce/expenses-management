import React from "react";
import { Outlet } from "react-router-dom";


interface Props {}

function AuthenticationPage() {

  return (
    <>
      <p>
       headers came here
      </p>
      <Outlet />
    </>
  );
}

export default AuthenticationPage;
