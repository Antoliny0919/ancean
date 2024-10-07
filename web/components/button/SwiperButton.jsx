import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa6';
import { FaArrowLeft } from 'react-icons/fa6';
import { useSwiper } from 'swiper/react';

const StyledSwiperButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  font-size: inherit;
  svg {
    width: 2.5em;
    height: 2.5em;
    color: ${(props) => props.$buttonColor};
  }
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    opacity: 0.5;
  }
  &:hover&:disabled {
    cursor: default;
  }
`;

export default function SwiperButton({
  color,
  direction,
  currentSlide,
  lastSlideNum,
}) {
  const swiper = useSwiper();

  return (
    <>
      {direction === 'previous' ? (
        <StyledSwiperButton
          $buttonColor={color}
          onClick={() => swiper.slidePrev()}
          // if currentSlide number is 0 means previous slide does not exist
          disabled={currentSlide === 0 && true}
        >
          <FaArrowLeft />
        </StyledSwiperButton>
      ) : (
        <StyledSwiperButton
          $buttonColor={color}
          onClick={() => swiper.slideNext()}
          // if currentSlide number is lastSlideNum means next slide does not exist
          disabled={currentSlide === lastSlideNum && true}
        >
          <FaArrowRight />
        </StyledSwiperButton>
      )}
    </>
  );
}
