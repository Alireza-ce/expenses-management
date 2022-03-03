import styled from "styled-components";
import { Link } from "react-router-dom";

export const RedirectLinks = styled.div`
  text-align: center;
  a > & {
    color: red;
  }
`;

export const CustomLink = styled(Link)`
  color: darkblue;
  text-decoration: none;
`;
