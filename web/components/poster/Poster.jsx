import styled, { css } from 'styled-components';
import { shadow, flex } from '@/styles/variable';

const StyledPoster = styled.div`
  @media screen and (min-width: 768px) {
    padding: 2rem 3rem;
  }
`;

const StyledPosterBorder = styled.div`
  border-radius: 10px;
  ${({ $borderColor }) =>
    $borderColor.includes('linear-gradient')
      ? css`
          background: linear-gradient(#fff, #fff), ${$borderColor};
          background-origin: border-box;
          background-clip: content-box, border-box;
          border: solid transparent 0.2rem;
        `
      : css`
          border: solid ${$borderColor} 0.2rem;
        `}
  ${({ $boxShadowProps }) =>
    $boxShadowProps && Array.isArray($boxShadowProps.hsl)
      ? css`
          ${shadow.linearHslShadow({ ...$boxShadowProps })}
        `
      : css`
          ${shadow.hslShadow({ ...$boxShadowProps })}
        `}
`;

const StyledPosterBody = styled.div`
  ${flex('column', 'center', 'center')};
  padding-top: 5rem;
  padding-bottom: 5rem;
  background: ${(props) => props.$backgroundColor};
`;

export default function Poster({
  children,
  borderColor,
  backgroundColor,
  boxShadowProps,
}) {
  return (
    <StyledPoster>
      <StyledPosterBorder
        $borderColor={borderColor}
        $boxShadowProps={boxShadowProps}
      >
        <StyledPosterBody $backgroundColor={backgroundColor}>
          {children}
        </StyledPosterBody>
      </StyledPosterBorder>
    </StyledPoster>
  );
}
