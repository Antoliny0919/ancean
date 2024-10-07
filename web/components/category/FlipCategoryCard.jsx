import Link from 'next/link';
import styled from 'styled-components';
import FlipCard from '../card/FlipCard';
import CategoryButton from './CategoryButton';
import ColorText from '../common/ColorText';
import { CATEGORY_DATA } from './data';
import { shadow, flex } from '../../styles/variable';

const StyledCategoryCard = styled.div`
  @media screen and (min-width: 768px) {
    height: 100%;
    width: 100%;
  }
  height: 70%;
  width: 70%;
  ${flex('column', 'center', 'center')};
  // The front of the category card has each color(props.$backgroundColor)
  // but back, all cards are in the same color(#484848)
  font-family: 'RaleWay';
  background: ${(props) =>
    props.$backgroundColor ? props.$backgroundColor : '#484848'};
  border-radius: 10px;
  font-size: 20px;
  letter-spacing: 3px;
  ${shadow.signatureBoxShadow(6)};
  & > * {
    margin-bottom: 10px;
  }
  svg {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
`;

export default function FlipCategoryCard({ name, postCount, props = {} }) {
  const { color, logo, transparentColor } = CATEGORY_DATA[name];

  return (
    <FlipCard
      // the front of a card
      frontComponent={
        <StyledCategoryCard $backgroundColor={color}>
          {logo}
          <div>{name}</div>
        </StyledCategoryCard>
      }
      // the back of a card
      backComponent={
        <StyledCategoryCard color={color} $buttonBackground={transparentColor}>
          <ColorText color={color}>{name}</ColorText>
          <ColorText color={color}>{postCount}개의 포스트</ColorText>
          <Link href={`/category/${name.toLowerCase()}`}>
            <CategoryButton style={{ padding: '8px 12px' }} name={name}>
              GO {name}
            </CategoryButton>
          </Link>
        </StyledCategoryCard>
      }
      // card size
      style={{ width: '300px' }}
      props={props}
    />
  );
}
