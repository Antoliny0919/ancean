import styled from 'styled-components';
import { IoWarning } from 'react-icons/io5';

const StyledWarningIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8%;
  background-color: ${({ theme }) => theme.colors.warning.base};
  svg {
    width: 50%;
    height: 50%;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default function Warning({ message, title }) {
  return (
    <div className="ce-block__content">
      <div className="cdx-block cdx-warning">
        <StyledWarningIcon>
          <IoWarning />
        </StyledWarningIcon>
        <div
          className="cdx-block cdx-warning__title"
          dangerouslySetInnerHTML={{ __html: title }}
        ></div>
        <div
          className="cdx-input cdx-warning__message"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
    </div>
  );
}
