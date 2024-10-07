import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import IntroduceMiniBlock from './IntroduceMiniBlock';
import { MY_INTRODUCE_DATA } from './data';

const StyledMyIntroduce = styled.div`
  @media screen and (min-width: 450px) {
    font-size: 10px;
  }
  @media screen and (min-width: 768px) {
    font-size: 12px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 14px;
  }
  height: 100%;
  width: 100%;
  font-size: 8px;
  padding: 1em 2em 1em 0;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`;

export default function MyIntroduce() {
  const [introduceBlockAnimationState, setIntroduceBlockAnimationState] =
    useState(false);

  const target = useRef(null);

  // observe introduce block and when it's shown on the screen(0.01%) run slide animation
  useEffect(() => {
    const introduceBlockObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((item) => {
          if (item.isIntersecting) {
            setIntroduceBlockAnimationState(true);
            observer.unobserve(target.current);
          }
        });
      },
      { threshold: 0.01 },
    );
    introduceBlockObserver.observe(target.current);
  });

  return (
    <StyledMyIntroduce ref={target}>
      {MY_INTRODUCE_DATA.map((item, index) => {
        // github, linkedin block have href so used Link Tag
        if (item.href) {
          return (
            <Link key={index} href={item.href}>
              <IntroduceMiniBlock
                animationState={introduceBlockAnimationState}
                title={item.title}
                subTitle={null}
                color={item.color}
                // Odd -> slide left , Even -> slide right (animation direction)
                isOdd={(index + 1) % 2 === 1}
              >
                {item.logo}
              </IntroduceMiniBlock>
            </Link>
          );
        }
        return (
          <IntroduceMiniBlock
            key={index}
            animationState={introduceBlockAnimationState}
            title={item.title}
            subTitle={item.subTitle}
            isOdd={(index + 1) % 2 === 1}
          >
            {item.logo}
          </IntroduceMiniBlock>
        );
      })}
    </StyledMyIntroduce>
  );
}
