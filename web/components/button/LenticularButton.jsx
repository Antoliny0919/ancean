import styled from 'styled-components';
import { flex } from '../../styles/variable';

export const StyledLenticularButton = styled.button`
  ${flex('row', 'center', 'center')};
  background-color: ${(props) => props.$backgroundColor};
  border: 2px solid ${(props) => props.$borderColor};
  border-radius: 30px;
  box-shadow: ${(props) => props.$borderColor} 3px 3px 0 0;
  color: ${(props) => props.$borderColor};
  cursor: pointer;
  font-weight: 600;
  font-size: inherit;
  padding: 0.5em 0.8em;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  &:hover {
    &::before {
      opacity: 0;
    }
    &::after {
      opacity: 1;
    }
  }

  &:active {
    box-shadow: ${(props) => props.$borderColor} 2px 2px 0 0;
    transform: translate(2px, 2px);
  }
  &::before {
    position: absolute;
    // content value string type is not delivered to props so use dataset
    content: attr(data-offtext);
    transition-property: opacity;
    transition-delay: 0.15s;
    transition-duration: 0.5s;
    width: inherit;
    z-index: 0;
  }

  &::after {
    position: relative;
    content: attr(data-ontext);
    opacity: 0;
    z-index: 5;
    transition-property: opacity;
    transition-delay: 0.15s;
    transition-duration: 0.5s;
  }
`;

export default function LenticularButton({
  beforeText,
  afterText,
  backgroundColor,
  borderColor,
}) {
  return (
    <StyledLenticularButton
      data-ontext={afterText}
      data-offtext={beforeText}
      $backgroundColor={backgroundColor}
      $borderColor={borderColor}
    />
  );
}
