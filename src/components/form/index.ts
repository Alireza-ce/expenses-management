import styled from "styled-components";

export const AuthenticationForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 550px;
  width: 100%;
  margin: 32px auto;
  padding: 24px;
  box-shadow: 0px 0px 16px rgb(255 255 255 / 30%);
  border-radius: 4px;
  background-color:${(props) => props.theme.warnColor}
`;
