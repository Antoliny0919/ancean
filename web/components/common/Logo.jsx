import Image from 'next/image';
import anceanSymbolImage from '../../public/banner-ancean-logo.png';

import styled from 'styled-components';
import Link from 'next/link';

export const StyledLogo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1em;
  font-family: 'Lora';
  font-weight: 400;
  margin: 0;
`;

export default function Logo({ symbol = true, style = {} }) {
  const PRODUCTION_IMAGE_URL = `${process.env.NEXT_PUBLIC_CLIENT}/banner-ancean-logo.png`;

  return (
    <Link href="/">
      <StyledLogo style={{ ...style }}>
        {symbol && (
          <Image
            src={
              process.env.NODE_ENV === 'production'
                ? PRODUCTION_IMAGE_URL
                : anceanSymbolImage
            }
            width={70}
            height={70}
            priority
            alt="no"
          ></Image>
        )}
        <>
          <span style={{ color: 'rgb(0, 90, 135)' }}>An</span>
          <span style={{ color: 'rgb(43, 74, 159)' }}>Cean</span>
        </>
      </StyledLogo>
    </Link>
  );
}
