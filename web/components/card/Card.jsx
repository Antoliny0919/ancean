import styled from 'styled-components';

const StyledCard = styled.div`
  height: 100%;
  width: 100%;
  aspect-ratio: 140 / 200;
  font-size: 20px;
  font-family: 'Pretendard-Bold';
`;

export default function Card({ children, style = {} }) {
  return <StyledCard style={{ ...style }}>{children}</StyledCard>;
}
