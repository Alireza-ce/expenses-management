import React from 'react'

interface Props {}

function LoginPage() {
  return (
    <p>LOign page {process.env.REACT_APP_BASE_URL} {process.env.REACT_APP_H}</p>
  );
}

export default LoginPage;
