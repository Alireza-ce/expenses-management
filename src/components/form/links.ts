import styled from "styled-components";
import { Link } from "react-router-dom";

export const LinkBox = styled.div`
  text-align: center;
  margin-top:12px ;
`;

export const CustomLink = styled(Link)`
  color: ${props => props.theme.primaryColor};
  text-decoration: none;
`;
