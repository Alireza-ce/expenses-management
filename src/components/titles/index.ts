import styled from "styled-components";

interface Props{
    textAlign?:string
}

export const  PrimaryTitle = styled.h1<Props>`
    color:  ${props => props?.color || props.theme.primaryColor};
    text-align:  ${props => props?.textAlign || 'left'};
`;

export const  SecondaryTitle = styled.h2<Props>`
    color:  ${props => props?.color || props.theme.primaryColor};
    text-align:  ${props => props?.textAlign || 'left'};
`;
