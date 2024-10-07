import { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Logo from '../common/Logo';
import CommonTextButton from '../button/CommonTextButton';
import { NAVBAR_EXCEPT_ROUTE, NAVBAR_SIDEBAR_PROPS } from './data';

const StyledNavbar = styled.nav`
  @media screen and (min-width: 768px) {
    font-size: 12px;
    justify-content: space-between;
  }
  width: 100%;
  display: flex;
  position: fixed;
  z-index: 1000;
  height: inherit;
  top: 0;
  transform: ${(props) => {
    if (props.$navState !== 'show') {
      return 'translateY(-80px)';
    }
  }};
  transition: transform 0.5s ease-in-out;
  padding: 1em 3em;
  max-width: 2048px;
  background-color: ${({ theme }) => theme.colors.lightWhite};
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard-Bold';
  font-size: 14px;
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.01),
    0 10px 30px rgba(0, 0, 0, 0.08);
`;

const StyledNavSideLogo = styled.div`
  display: none;
`;

const StyledNavSideBar = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
    ${StyledNavSideLogo} {
      display: block;
    }
  }
  display: flex;
  align-items: center;
  letter-spacing: 2px;
  font-weight: 700;
  font-size: 1.2em;
  a + a {
    margin-left: 40px;
  }
`;

export default function Navbar({ currentPathName }) {
  const [navState, setNavState] = useState('show');

  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // When the client scrolls down, navbar disappears and navbar appears when scrolling up.
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setNavState('disable');
      } else {
        setNavState('show');
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div style={{ height: '80px' }}>
      {/* verify that the layout applies to the current path */}
      {!NAVBAR_EXCEPT_ROUTE.includes(currentPathName) && (
        <StyledNavbar $navState={navState}>
          <Logo style={{ 'font-size': '3em' }} />
          <StyledNavSideBar>
            {NAVBAR_SIDEBAR_PROPS.map(({ name, href, style }, index) => {
              return (
                <Link href={href} key={index}>
                  <CommonTextButton style={style}>{name}</CommonTextButton>
                </Link>
              );
            })}
            {/* <StyledMainLogo>
              hello
            </StyledMainLogo> */}
            {/* <Link href={'/'}>
              <LenticularButton
                beforeText="ABOUT ME"
                afterText="ANTOLINY"
                backgroundColor={({ theme }) => theme.colors.lightWhite}
                borderColor="blue"
              />
            </Link> */}
          </StyledNavSideBar>
        </StyledNavbar>
      )}
    </div>
  );
}
