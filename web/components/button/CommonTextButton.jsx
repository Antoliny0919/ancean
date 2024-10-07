import styled from 'styled-components';

export const StyledCommonTextButton = styled.button`
  font-size: 1.5em;
  letter-spacing: 0.1em;
  font-family: inherit;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.black};
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }
`;

export default function CommonTextButton({ children, style = {} }) {
  return (
    <StyledCommonTextButton style={{ ...style }}>
      {children}
    </StyledCommonTextButton>
  );
}
