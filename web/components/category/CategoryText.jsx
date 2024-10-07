import styled, { css } from 'styled-components';
import { CATEGORY_DATA } from './data';
import { textColor, shadow } from '../../styles/variable';

export const StyledCategoryText = styled.div`
  font-family: 'Pretendard-Bold';
  font-size: inherit;
  letter-spacing: 0.1em;
  &::after {
    content: '${(props) => props.name}';
    position: relative;
    ${({ $textShadow }) =>
      $textShadow && Array.isArray($textShadow.hsl)
        ? css`
            ${shadow.linearHslShadow({ ...$textShadow })}
          `
        : css`
            ${shadow.hslShadow({ ...$textShadow })}
          `}
  }
  &::before {
    content: '${(props) => props.name}';
    position: absolute;
    ${(props) =>
      props.color && props.color.includes('linear-gradient')
        ? css`
            ${textColor.linearGradient(props.color)};
          `
        : css`
            color: ${(props) => props.color};
          `}
    z-index: 10;
  }
`;

export default function CategoryText({ name, style = {} }) {
  const { color, hsl } = CATEGORY_DATA[name];

  return (
    <StyledCategoryText
      name={name}
      color={color}
      $textShadow={{ type: 'text', thickness: 10, hsl: hsl }}
      style={{ ...style }}
    />
  );
}
