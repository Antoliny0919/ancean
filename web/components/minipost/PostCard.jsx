import Image from '../common/Image';
import Link from 'next/link';
import styled from 'styled-components';
import Card from '../card/Card';
import { shadow, flex, miniPostContent } from '../../styles/variable';
import { WaveLogo, CommentLogo } from '../common/Icon';

const StyledPostCardImage = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.lightWhite};
  border-radius: 10px;
  aspect-ratio: 1 / 1.4;
  ${shadow.signatureBoxShadow(5)};
  transition: opacity 0.7s;
  z-index: 10;
  img {
    width: 100%;
    height: 60%;
    border-radius: 10px;
  }
  &:hover {
    opacity: 0.15;
  }
`;

const StyledPostCardCover = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.lightWhite};
  z-index: 0;
  border-radius: 10px;
  font-size: 16px;
  padding: 20px 10px;
  color: ${({ theme }) => theme.colors.black};
  ${shadow.signatureBoxShadow(5)};
  ${flex('column', 'none', 'center')}
  & > * {
    width: 80%;
  }
  .title {
    text-align: center;
    border-bottom: solid ${({ theme }) => theme.colors.gray} 2px;
    ${miniPostContent.titleEllipsis()};
  }
  .content {
    ${miniPostContent.contentEllipsis(10)};
    font-size: 13px;
  }
  .author-and-writer-area {
    padding: 10px 0;
    font-size: 10px;
    color: ${({ theme }) => theme.colors.gray};
  }
  .index-area {
    padding: 10px 0;
    font-size: 22px;
    ${flex('row', 'center', 'center')};
    font-family: 'SUIT-Regular';
    .index {
      ${flex('row', 'space-around', 'center')};
      margin-right: 20px;
      width: 30%;
      svg {
        color: #0c405e;
      }
      .value {
        margin-bottom: 5px;
      }
    }
  }
`;

export default function PostCard({ post }) {
  const { header_image, author, title, created_at, id, introduce, wave } = post;

  const createDate = new Date(created_at);

  return (
    <Link href={`/posts/${id}`} style={{ width: '100%', height: '100%' }}>
      <Card>
        <StyledPostCardImage>
          <Image src={header_image}></Image>
        </StyledPostCardImage>
        <StyledPostCardCover>
          <div className="title">{title}</div>
          <div className="content">{introduce}</div>
          <div className="author-and-writer-area">
            <div>작성자: {author}</div>
            <div>
              작성일: {createDate.getFullYear()}년 {createDate.getMonth() + 1}월{' '}
              {createDate.getDate()}일
            </div>
          </div>
          <div className="index-area">
            <div className="index">
              <span>{WaveLogo}</span>
              <span className="value">{wave}</span>
            </div>
            <div className="index">
              <span>{CommentLogo}</span>
              <span className="value">0</span>
            </div>
          </div>
        </StyledPostCardCover>
      </Card>
    </Link>
  );
}
