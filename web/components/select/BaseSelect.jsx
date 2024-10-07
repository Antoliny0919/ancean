import styled, { css } from 'styled-components';

const StyledBaseSelect = styled.div`
  position: relative;
  width: 200px;
  height: 40px;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.mainColor[4]};
  cursor: pointer;
  .label {
    display: flex;
    align-items: center;
    width: inherit;
    height: inherit;
    border: 0 none;
    outline: 0 none;
    padding-left: 15px;
    background: transparent;
    cursor: pointer;
  }
  .option-list {
    position: absolute;
    top: 28px;
    left: 0;
    width: 100%;
    color: ${({ theme }) => theme.colors.white};
    list-style-type: none;
    padding: 0;
    border-radius: 6px;
    overflow: hidden;
    max-height: 0;
    transition: 0.3s ease-in;
    ${(props) =>
      props.$selectState &&
      css`
        max-height: 200px;
        overflow: scroll;
      `}
  }
  .option-item {
    background: ${({ theme }) => theme.colors.lightMainColor[3]};
    ${(props) =>
      props.$backgroundColor &&
      css`
        background: ${(props) => props.$backgroundColor};
      `}
    border-bottom: 1px dashed ${({ theme }) => theme.colors.mainColor[9]};
    padding: 5px 15px 5px;
    transition: 0.7s;
  }
  .option-item:hover {
    background: ${({ theme }) => theme.colors.mainColor[4]};
  }
`;

export default function BaseSelect({
  children,
  selectedData,
  defaultData,
  selectState,
  setSelectState,
}) {
  return (
    <StyledBaseSelect $selectState={selectState}>
      <button className="label" onClick={setSelectState}>
        {selectedData ? selectedData : defaultData}
      </button>
      <ul className="option-list">{children}</ul>
    </StyledBaseSelect>
  );
}
