import { Container } from "../../components/container";
import React from "react";
import { Outlet } from "react-router-dom";
import { Authentication, Column, FormWrapper } from "./authentication.style";
import { PrimaryTitle } from "../../components/titles";
import classes from './authentication.module.scss';

interface Props { }

function AuthenticationPage() {

  return (
    <Container>
      <Authentication>
        <PrimaryTitle textAlign="center">
          Expenses Management
        </PrimaryTitle>
        <div className={classes.formWrapper}>
          <div className={classes.route}>
            <Outlet />
          </div>
          <div >page logo and image came here</div>
        </div>
      </Authentication>
    </Container>
  );
}

export default AuthenticationPage;
