import styled, { keyframes, css } from 'styled-components';

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledFadeInAnimation = styled.div`
  width: inherit;
  opacity: 0;
  ${(props) =>
    props.$animationState &&
    css`
      animation: ${fadeInAnimation} 1s 0s 1;
      animation-fill-mode: forwards;
    `}
`;

export default function FadeInAnimation({ animationState, children }) {
  return (
    <StyledFadeInAnimation $animationState={animationState}>
      {children}
    </StyledFadeInAnimation>
  );
}
