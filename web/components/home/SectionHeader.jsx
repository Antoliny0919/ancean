import styled from 'styled-components';
import SignatureText from '../common/SignatureText';

const StyledSectionHeaderArea = styled.div`
  font-size: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Raleway';
  margin-bottom: 2em;
  h5 {
    font-size: 1.2em;
    margin-bottom: 2em;
    margin: 0;
    font-family: 'GmarketSansMedium';
  }
`;

export default function SectionHeader({
  mainTitle,
  subTitle,
  colorHSL,
  style = {},
}) {
  return (
    <StyledSectionHeaderArea style={{ ...style }}>
      <SignatureText
        colorHSL={colorHSL}
        props={{ className: 'fade-in-slide-down-suspend' }}
      >
        {mainTitle}
      </SignatureText>
      <h5 className="fade-in-slide-down-suspend">{subTitle}</h5>
    </StyledSectionHeaderArea>
  );
}
