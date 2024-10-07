import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { flex } from '../../styles/variable';

const StyledFlipCard = styled.div`
  position: relative;
  display: inline-grid;
  color: ${({ theme }) => theme.colors.white};
  transition: transform 1s;
  transform-style: preserve-3d;
  opacity: 0.5;
  ${(props) =>
    // active slide opacity 1(center located)
    props.$isActive &&
    css`
      opacity: 1;
    `};
  & > * {
    grid-area: 1 / 1 / 1 / 1;
    ${flex('row', 'center', 'center')};
    aspect-ratio: 140 / 200;
    font-family: 'Pretendard-Bold';
    font-size: 20px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  &:hover {
    cursor: pointer;
  }
  .flip-card-front {
    width: 100%;
    height: 100%;
  }
  .flip-card-back {
    width: 100%;
    height: 100%;
    transform: rotateY(180deg);
  }
`;

export default function FlipCard({
  frontComponent,
  backComponent,
  style = {},
  props = {},
}) {
  const target = useRef(null);

  // card flip logic
  const flipCategoryCard = () => {
    // returning the already flipped state to its original state
    if (target.current.style.transform === 'rotateY(180deg)') {
      target.current.style.transform = 'rotateY(0deg)';
    } else {
      target.current.style.transform = 'rotateY(180deg)';
    }
  };

  useEffect(() => {
    // non active slide cannot be flip
    target.current.style.transform = 'rotateY(0deg)';
  }, [props.isActive]);

  return (
    <StyledFlipCard
      ref={target}
      onClick={flipCategoryCard}
      style={{ ...style }}
      {...props}
    >
      <div className="flip-card-front">{frontComponent}</div>
      <div className="flip-card-back">{backComponent}</div>
    </StyledFlipCard>
  );
}
