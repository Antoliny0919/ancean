import Link from 'next/link';
import styled from 'styled-components';
import Image from '../common/Image';
import CreateDate from '../common/Date';
import CategoryButton from '../category/CategoryButton';
import { shadow, miniPostContent, flex } from '@/styles/variable';

const StyledPostArea = styled(Link)`
  @media screen and (min-width: 768px) {
    flex-direction: row;
    width: 70%;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: inherit;
  width: 30em;
  ${shadow.signatureBoxShadow(4)};
  background-color: white;
  transition:
    box-shadow 1s,
    border 1s;
  border-radius: 10px;
  .header-img {
    @media screen and (min-width: 768px) {
      width: 30%;
      height: 100%;
    }
    width: 100%;
    height: 15em;
    aspect-ratio: 1 / 0.7;
    /* height: 150px; */
    img {
      border-radius: 10px;
      width: 100%;
      height: 100%;
    }
  }
  .post-content {
    display: flex;
    flex-direction: column;
  }
  & + & {
    margin-top: 2rem;
  }
  &:hover {
    cursor: pointer;
    ${shadow.signatureBoxShadow(1)};
  }
`;

const StyledPostContent = styled.div`
  @media screen and (min-width: 768px) {
    padding: 1em 2em 2em 2em;
    height: 22em;
  }
  height: 25em;
  padding: 1em 0;
  width: 70%;
  .title {
    height: 15%;
    font-size: 1.8em;
    display: block;
    font-family: 'Pretendard-Bold';
    ${miniPostContent.titleEllipsis};
  }
  .content {
    height: 55%;
    font-size: 1em;
    font-family: 'Pretendard-Light';
    background-color: white;
    ${miniPostContent.contentEllipsis};
  }
  .footer {
    height: 10%;
    ${flex('row', 'space-between', 'center')};
    margin-top: 1em;
    font-size: 0.9em;
    .write-date {
      font-family: 'SUIT-Regular';
      color: rgba(37, 37, 37, 0.8);
    }
  }
`;

export default function ResponsivePost({ post, props = {} }) {
  const { id, category, introduce, created_at, header_image, title } = post;

  const writeDate = CreateDate(created_at);

  return (
    <StyledPostArea {...props} href={`/posts/${id}`}>
      <div className="header-img">
        <Image src={header_image}></Image>
      </div>
      <StyledPostContent>
        <h3 className="title">{title}</h3>
        <div className="content">{introduce}</div>
        <div className="footer">
          {writeDate && (
            <div className="write-date">
              작성일: {writeDate.getFullYear()}년 {writeDate.getMonth() + 1}월{' '}
              {writeDate.getDate()}일
            </div>
          )}
          {category && (
            <CategoryButton name={category}>{category}</CategoryButton>
          )}
        </div>
      </StyledPostContent>
    </StyledPostArea>
  );
}
