import { Container } from "../../components/container";
import React from "react";
import { Outlet } from "react-router-dom";
import { Authentication } from "./authentication.style";
import { PrimaryTitle } from "../../components/titles";
import classes from './authentication.module.scss';

interface Props { }

function AuthenticationPage() {

  return (
    <Container className={classes.authenticationPage}>
      <Authentication>
        <div className={classes.formWrapper}>
          <div className={classes.routerOutlet}>
            <Outlet />
          </div>
          <div className={classes.authenticationInfo}>
            <h2>Expenses Management</h2>
            <img src={require('../../assets/img/treasure.png')}  alt="authentication-logo"/>
          </div>
        </div>
      </Authentication>
    </Container>
  );
}

export default AuthenticationPage;
