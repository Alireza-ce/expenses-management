import styled from "styled-components";
import Button from "@material-ui/core/Button";

export const Button1 = styled(Button)`
  && {
    margin: 24px;
    color: red;
    background-color: blue;
    height: 80px;
    &:hover {
      background-color: red;
    }
  }
`;
