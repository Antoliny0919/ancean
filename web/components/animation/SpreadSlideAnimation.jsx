import styled, { css, keyframes } from 'styled-components';

const spreadSlideAnimation = (direction) => keyframes`
  0% {
    left: 50%;
    transform: translateX(-50%);
    width: 2.5em;
  }
  50% {
    left: ${direction === 'left' ? 0 : 100}%;
    transform: translateX(0%);
    width: 2.5em;
  }
  100% {
    // increase the width to make block content visible
    width: 80%;
  }
`;

const StyledSpreadSlideAnimation = styled.div`
  position: relative;
  // located in the center before animation start
  left: 50%;
  transform: translateX(-50%);
  transition: width 1s;
  &.odd {
    ${(props) =>
      props.$animationState &&
      css`
        // odd index block slide direction left
        animation: ${spreadSlideAnimation('left')} 3s 0s 1;
        animation-fill-mode: forwards;
      `}
  }
  &.even {
    ${(props) =>
      props.$animationState &&
      css`
        // even index block slide direction right
        animation: ${spreadSlideAnimation('right')} 3s 0s 1;
        animation-fill-mode: forwards;
      `}
  }
`;

export default function SpreadSlideAnimation({
  children,
  animationState,
  isOdd,
  props = {},
}) {
  return (
    <StyledSpreadSlideAnimation
      $animationState={animationState}
      // SpreadSlideAnimation take block index number, slide action direction to the left when the number is odd
      className={isOdd ? 'odd' : 'even'}
      {...props}
    >
      {children}
    </StyledSpreadSlideAnimation>
  );
}
