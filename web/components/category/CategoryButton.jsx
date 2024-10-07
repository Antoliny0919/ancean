import styled from 'styled-components';
import { CATEGORY_DATA } from './data';
import { shadow } from '@/styles/variable';

const StyledCategoryButton = styled.button`
  font-size: inherit;
  font-family: 'Raleway';
  background: ${(props) => props.$categoryColor};
  color: white;
  border-radius: 10px;
  opacity: 0.8;
  padding: 0.3em 0.5em;
  border: solid 1px #273237;
  ${shadow.signatureBoxShadow(3)};
  transition: opacity 0.7s;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }

  & + & {
    margin-left: 5rem;
  }
`;

export default function CategoryButton({
  children,
  name,
  props = {},
  style = {},
}) {
  const categoryColor = CATEGORY_DATA[name]['color'];

  return (
    <StyledCategoryButton
      name={name}
      $categoryColor={categoryColor}
      {...props}
      style={style}
    >
      {children}
    </StyledCategoryButton>
  );
}
