import styled from 'styled-components';
import MySkill from '../skill/MySkill';
import MyIntroduce from '../introduce/MyIntroduce';

import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

const StyledAboutMe = styled.div`
  width: 100%;
  font-size: 18px;
  padding-bottom: 5em;
  .my-introduce {
    @media screen and (min-width: 768px) {
      flex-direction: row;
    }
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
`;

const StyledMyInfoSection = styled.div`
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

export default function AboutMe() {
  return (
    <StyledAboutMe>
      <div className="my-introduce">
        <StyledMyInfoSection>
          <MyIntroduce />
        </StyledMyInfoSection>
        <StyledMyInfoSection>
          <MySkill />
        </StyledMyInfoSection>
      </div>
    </StyledAboutMe>
  );
}
