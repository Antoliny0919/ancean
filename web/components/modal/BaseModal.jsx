import { useEffect } from 'react';
import styled from 'styled-components';

const StyledBackground = styled.div`
  position: absolute;
  bottom: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 100;
`;

const StyledBaseModal = styled.div`
  position: fixed;
  aspect-ratio: 1 / 0.7;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: solid ${({ theme }) => theme.colors.mainColor[4]} 0.2vw;
  border-radius: 10px;
  font-family: 'NanumBarunGothic';
`;

export default function BaseModal({ state, children, styleProps = {} }) {
  useEffect(() => {
    if (state) {
      document.body.style = 'overflow: hidden';
    } else {
      document.body.style = 'overflow: none';
    }
  }, [
    state,
    typeof window !== 'undefined' && window.outerWidth,
    typeof window !== 'undefined' && window.outerHeight,
  ]);

  return (
    <>
      {state && (
        <StyledBackground>
          <StyledBaseModal style={styleProps}>{children}</StyledBaseModal>
        </StyledBackground>
      )}
    </>
  );
}
