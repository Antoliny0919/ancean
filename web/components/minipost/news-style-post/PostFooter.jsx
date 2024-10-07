import styled from 'styled-components';
import { flex } from '../../../styles/variable';

const StyledPostFooterArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.6em;
  padding: 0.5em 1em 0.5em 1em;
  border-top: solid ${({ theme }) => theme.colors.lightGray} 0.1em;
  font-family: 'GmarketSansMedium';
  align-items: center;
`;
const StyledCategoryArea = styled.div`
  ${flex('row', 'flex-end', 'center')};
  width: 50%;
  span {
    margin-right: 0.2em;
  }
  .category {
    padding-left: 0.3em;
    padding-right: 0.3em;
  }
`;

export default function PostFooter({ author, categoryName }) {
  return (
    <StyledPostFooterArea>
      <div className="author">작성자: {author}</div>
      {/* category may not exist */}
      {categoryName && (
        <StyledCategoryArea>
          <span>카테고리: </span>
          <span className="category">{categoryName}</span>
        </StyledCategoryArea>
      )}
    </StyledPostFooterArea>
  );
}
