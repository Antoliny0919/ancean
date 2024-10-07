import { useState } from 'react';
import styled, { css } from 'styled-components';
import SpreadSlideAnimation from '../animation/SpreadSlideAnimation';
import FadeInAnimation from '../animation/FadeInAnimation';
import { flex, shadow } from '../../styles/variable';

const StyledIntroduceMiniBlock = styled.div`
  width: 100%;
  height: 3.5em;
  display: flex;
  font-size: inherit;
  font-family: 'NanumBarunGothic';
  box-sizing: content-box;
  padding: 1em;
  border-radius: 10px;
  margin: 1em 0em;
  ${shadow.signatureBoxShadow(4)};
  ${(props) =>
    props.$isOdd &&
    css`
      flex-direction: row-reverse;
    `}
  ${(props) =>
    // Link IntroduceMiniBlock have background color
    props.color
      ? css`
          background-color: ${(props) => props.color};
          color: ${({ theme }) => theme.colors.white};
          svg {
            color: ${({ theme }) => theme.colors.white};
          }
        `
      : css`
          background-color: ${({ theme }) => theme.colors.white};
        `}
  svg {
    width: 2.5em;
    height: 2.5em;
  }
  .short-introduce {
    width: 100%;
    height: 100%;
    ${flex('column', 'center', 'none')};
    font-size: inherit;
    .sub-title {
      @media screen and (min-width: 768px) {
        font-size: 10px;
      }
      @media screen and (min-width: 1024px) {
        font-size: 13px;
      }
      margin-top: 0.5em;
      font-size: 8px;
      color: ${({ theme }) => theme.colors.subTitleBlack};
    }
  }
`;

export default function IntroduceMiniBlock({
  children,
  animationState,
  title,
  subTitle,
  isOdd,
  color,
}) {
  const [textState, setTextState] = useState(false);

  return (
    <SpreadSlideAnimation
      isOdd={isOdd}
      animationState={animationState}
      // when SpreadSlideAnimation is finished start FadeInAnimation
      props={{ onAnimationEnd: () => setTextState(true) }}
    >
      <StyledIntroduceMiniBlock color={color} $isOdd={isOdd}>
        {children}
        <FadeInAnimation animationState={textState}>
          <div className="short-introduce">
            <div className="title">{title}</div>
            <div className="sub-title">{subTitle}</div>
          </div>
        </FadeInAnimation>
      </StyledIntroduceMiniBlock>
    </SpreadSlideAnimation>
  );
}
