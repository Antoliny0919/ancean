import styled from 'styled-components';

const StyledSectionButton = styled.button`
  border-radius: 10px;
  padding: 0.7em 1em 0.7em 1em;
  font-size: inherit;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  background-color: ${(props) => props.color};
  box-shadow:
    rgba(45, 35, 66, 0.4) 0 3px 5px,
    rgba(45, 35, 66, 0.3) 0 8px 12px -3px,
    ${(props) => props.shadow} 0 -3px 0 inset;
  transition:
    box-shadow 0.4s,
    transform 0.4s,
    color 0.4s,
    background-color 0.4s;
  & + & {
    margin-left: 1.3rem;
  }
  &:hover {
    cursor: pointer;
    box-shadow:
      rgba(45, 35, 66, 0.4) 0 4px 8px,
      rgba(45, 35, 66, 0.3) 0 8px 12px -3px,
      ${(props) => props.$hoverShadow} 0 -3px 0 inset;
    color: white;
    transform: translateY(-3px);
  }
  &:active {
    box-shadow: #d6d6e7 0 3px 7px inset;
    transform: translateY(3px);
  }
`;

export default function ThreeDimensionalButton({
  children,
  color,
  shadow,
  hoverShadow,
  props = {},
}) {
  return (
    <StyledSectionButton
      color={color}
      shadow={shadow}
      $hoverShadow={hoverShadow}
      {...props}
    >
      {children}
    </StyledSectionButton>
  );
}
