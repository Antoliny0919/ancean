import styled, { css } from 'styled-components';
import { textColor } from '../../styles/variable';

export const StyledColorText = styled.div`
  ${(props) =>
    props.color && props.color.includes('linear-gradient')
      ? css`
          ${textColor.linearGradient(props.color)};
        `
      : css`
          color: ${(props) => props.color};
        `}
`;

export default function ColorText({ children, color, props }) {
  return (
    <StyledColorText color={color} {...props}>
      {children}
    </StyledColorText>
  );
}
