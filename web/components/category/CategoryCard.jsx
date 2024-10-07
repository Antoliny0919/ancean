import styled from 'styled-components';
import Card from '../card/Card';
import { CATEGORY_DATA } from './data';
import { flex, shadow } from '../../styles/variable';

const StyledCategoryCard = styled.div`
  background: ${(props) => props.color};
  width: 100%;
  height: 100%;
  border-radius: 10px;
  font-family: 'RaleWay';
  ${flex('column', 'center', 'center')};
  ${shadow.signatureBoxShadow(5)};
  color: ${({ theme }) => theme.colors.white};
  svg {
    height: 50px;
    width: 50px;
  }
`;

export default function CategoryCard({ name }) {
  return (
    <Card>
      <StyledCategoryCard color={CATEGORY_DATA[name]['color']}>
        <div>{CATEGORY_DATA[name]['logo']}</div>
        <div>{name}</div>
      </StyledCategoryCard>
    </Card>
  );
}
