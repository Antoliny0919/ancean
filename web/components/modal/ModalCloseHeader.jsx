import styled from 'styled-components';
import { IoCloseCircle } from 'react-icons/io5';

const StyledModalCloseHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  color: ${({ theme }) => theme.colors.state.fail};
  font-size: 14px;

  svg {
    width: 1.5em;
    height: 1.5em;
  }
  svg:hover {
    cursor: pointer;
  }
`;

export default function ModalCloseHeader({ close }) {
  return (
    <StyledModalCloseHeader>
      <IoCloseCircle
        onClick={() => {
          close();
        }}
      />
    </StyledModalCloseHeader>
  );
}
