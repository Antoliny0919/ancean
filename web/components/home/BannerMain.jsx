import Image from 'next/image';
import styled from 'styled-components';
import Logo from '../common/Logo';
import AnceanSymbol from '../../public/banner-ancean-logo.png';
import CommonButton, { StyledCommonButton } from '../button/CommonButton';

const StyledBannerArea = styled.section`
  @media screen and (min-width: 450px) {
    font-size: 26px;
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
    height: calc(100vh - 80px);
  }
  @media screen and (min-width: 1024px) {
    padding: 3em 5em 0 5em;
  }
  @media screen and (min-width: 1440px) {
    font-size: 30px;
    padding: 3em 8em 0 8em;
  }
  display: flex;
  flex-direction: column;
  font-size: 18px;
  padding: 0em 2em;
`;

const StyledBannerInfo = styled.div`
  font-family: 'Raleway';
  font-size: inherit;
  padding: 3em 0em;
  flex: 1;
  height: 100%;
  .title {
    @media screen and (min-width: 768px) {
      align-items: flex-start;
    }
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .full-name {
      font-size: 0.5em;
      font-family: 'GmarketSansMedium';
      margin-bottom: 1em;
    }
    ${StyledCommonButton} {
      font-size: 0.75em;
      font-family: 'Raleway';
      font-weight: 400;
      margin-top: 2em;
    }
  }
`;

const StyledBannerProfile = styled.div`
  @media screen and (min-width: 768px) {
    height: 100%;
  }
  padding: 1em 0em;
  flex: 1;
  img {
    height: 100%;
    width: 100%;
  }
`;

export default function BannerMain() {
  return (
    <StyledBannerArea>
      <StyledBannerInfo>
        <div className="title">
          <div className="full-name">
            <span style={{ color: 'rgb(43, 74, 159)' }}>Antoliny </span>
            <span style={{ color: 'rgb(0, 90, 135)' }}>Ocean</span>
          </div>
          <Logo symbol={false} style={{ 'font-size': '3em' }}></Logo>
          <p>Antoliny&#39;s Experience database</p>
          <CommonButton>Who is Antoliny?</CommonButton>
        </div>
      </StyledBannerInfo>
      <StyledBannerProfile>
        <Image
          src={AnceanSymbol}
          width={0}
          height={0}
          priority
          alt="no"
        ></Image>
      </StyledBannerProfile>
    </StyledBannerArea>
  );
}
