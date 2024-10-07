import styled from 'styled-components';
import BaseSelect from '../select/BaseSelect';
import { CATEGORY_DATA } from './data';

const StyledOption = styled.li`
  background: ${(props) => props.$backgroundColor};
  border-bottom: 1px dashed ${({ theme }) => theme.colors.mainColor[9]};
  padding: 5px 15px 5px;
  transition: 0.7s;
`;

export default function CategorySelect({
  categories,
  selectedCategory,
  defaultData,
  optionProps = {},
  selectState,
  setSelectState,
}) {
  return (
    <BaseSelect
      selectedData={selectedCategory}
      defaultData={defaultData}
      selectState={selectState}
      setSelectState={setSelectState}
    >
      <StyledOption
        $backgroundColor={({ theme }) => theme.colors.gray}
        {...optionProps}
      >
        선택안함
      </StyledOption>
      {categories.map((category, index) => {
        return (
          <StyledOption
            key={index}
            $backgroundColor={CATEGORY_DATA[category.name]['color']}
            {...optionProps}
          >
            {category.name}
          </StyledOption>
        );
      })}
    </BaseSelect>
  );
}
