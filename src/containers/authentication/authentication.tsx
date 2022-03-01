import { Container } from "../../components/container";
import React from "react";
import { Outlet } from "react-router-dom";
import { Authentication } from "./authentication.style";
import { PrimaryTitle } from "../../components/titles";


interface Props { }

function AuthenticationPage() {

  return (
    <Container>
      <Authentication>
        <PrimaryTitle textAlign="center">
          Expenses Management
        </PrimaryTitle>
        <Outlet />
      </Authentication>
    </Container>
  );
}

export default AuthenticationPage;
