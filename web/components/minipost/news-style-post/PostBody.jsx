import styled from 'styled-components';
import CreateDate from '@/components/common/Date';
import { miniPostContent } from '@/styles/variable';

const StyledPostBodyArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  height: 13em;
  .title {
    height: 20%;
    font-size: 1.2em;
    ${miniPostContent.titleEllipsis};
    font-family: 'Pretendard-Bold';
    margin-bottom: 0.7em;
  }
  .content {
    height: 75%;
    font-size: 0.8em;
    ${miniPostContent.contentEllipsis(5)};
    font-family: 'Pretendard-Light';
    margin-bottom: 1.5em;
  }
  .created-date {
    font-size: 0.6em;
    font-family: 'Pretendard-Light';
    color: ${({ theme }) => theme.colors.gray};
  }
`;

export default function PostBody({ content, title, created_at }) {
  const date = CreateDate(created_at);

  return (
    <StyledPostBodyArea>
      <div className="title">{title}</div>
      <div className="content">{content}</div>
      {date && (
        <div className="created-date">
          작성일: {date.getFullYear()}년 {date.getMonth() + 1}월{' '}
          {date.getDate()}일
        </div>
      )}
    </StyledPostBodyArea>
  );
}
