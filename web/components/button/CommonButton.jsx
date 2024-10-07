import styled, { css } from 'styled-components';

export const StyledCommonButton = styled.button`
  font-size: inherit;
  font-family: 'NanumBarunGothic';
  padding: 0.7em 1em 0.7em 1em;
  border-radius: 5px;
  outline: none;
  border: solid ${({ theme }) => theme.colors.mainColor[4]} 2px;
  background-color: ${({ theme }) => theme.colors.mainColor[6]};
  transition:
    color 0.7s,
    background-color 0.7s,
    opacity 0.7s;
  color: ${({ theme }) => theme.colors.white};
  ${(props) =>
    props.disabled
      ? css`
          opacity: 0.7;
        `
      : css`
          opacity: 1;
          &:hover {
            color: ${({ theme }) => theme.colors.black};
            background-color: ${({ theme }) => theme.colors.white};
          }
        `}
`;

export default function CommonButton({ children, props = {}, style = {} }) {
  return (
    <StyledCommonButton style={style} {...props}>
      {children}
    </StyledCommonButton>
  );
}
