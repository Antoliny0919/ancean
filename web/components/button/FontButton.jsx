import styled, { css } from 'styled-components';

export const StyledFontButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.mainColor[4]};
  font-size: inherit;
  font-weight: 900;
  transition:
    color 0.7s,
    opacity 0.7s;
  ${(props) =>
    props.disabled
      ? css`
          opacity: 0.7;
        `
      : css`
          opacity: 1;
          &:hover {
            cursor: pointer;
            color: #28baaf;
          }
        `}
`;

export default function FontButton({ children, props = {} }) {
  return <StyledFontButton {...props}>{children}</StyledFontButton>;
}
