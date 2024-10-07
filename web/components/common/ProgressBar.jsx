import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledProgressBar = styled.div`
  width: 90%;
  height: 25px;
  .before {
    width: inherit;
    height: inherit;
    position: absolute;
    display: block;
    background-color: ${({ theme }) => theme.colors.lightGray};
    border-radius: 5px;
  }
  .after {
    height: inherit;
    position: relative;
    display: block;
    background: ${(props) => props.color};
    width: ${(props) => props.$percentage};
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    z-index: 1;
    transition: width 2s ease-in-out;
  }
`;

export default function ProgressBar({ percentage, color }) {
  const target = useRef(null);

  const [progressState, setProgressState] = useState(0);

  // when the progress bar is shown on the screen change width value
  // effect of the progress bar filling up(like animation)

  useEffect(() => {
    const progressObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((item) => {
          if (item.isIntersecting) {
            setProgressState(percentage);
            observer.unobserve(target.current);
          }
        });
      },
      { threshold: 1 },
    );
    progressObserver.observe(target.current);
  });

  return (
    <StyledProgressBar $percentage={progressState} color={color} ref={target}>
      <div className="before"></div>
      <div className="after"></div>
    </StyledProgressBar>
  );
}
