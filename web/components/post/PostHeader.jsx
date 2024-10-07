import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Wave from 'react-wavify';
import styled from 'styled-components';
import { FaPen, FaLock, FaLockOpen } from 'react-icons/fa';
import CategoryButton from '../category/CategoryButton';
import FontButton from '../button/FontButton';
import PostDate from './PostDate';
import usePost from './usePost';
import { miniPostContent } from '../../styles/variable';

const StyledPostHeader = styled.div`
  @media screen and (min-width: 768px) {
    font-size: 32px;
    padding-top: 4em;
  }
  position: relative;
  z-index: 10;
  width: 80%;
  font-size: 20px;
  padding-top: 1em;
  margin-right: auto;
  margin-left: auto;
  height: 20em;
  color: ${({ theme }) => theme.colors.black};
  font-family: 'Pretendard-Bold';
  .post-main {
    position: relative;
    z-index: 100;
    h1 {
      @media screen and (min-width: 450px) {
        font-size: 32px;
      }
      @media screen and (min-width: 768px) {
        font-size: 64px;
        text-align: start;
      }
      ${miniPostContent.contentEllipsis(2)};
      font-size: 24px;
      max-height: 300px;
      text-align: center;
    }
  }
  .sub-title {
    @media screen and (min-width: 450px) {
      font-size: 12px;
    }
    @media screen and (min-width: 768px) {
      font-size: 16px;
      justify-content: flex-start;
    }
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 8px;
    & > * {
      margin-right: 1.5em;
      display: flex;
      align-items: center;
    }
    svg {
      margin-right: 5px;
    }
  }
  & > div:nth-child(2) {
    @media screen and (max-width: 768px) {
      flex-direction: column;
      & > * {
        margin: 0.2em 0;
      }
    }
  }
  & > div:nth-child(3) {
    margin: 1em 0;
  }
`;

const StyledHeaderWave = styled.div`
  position: relative;
  bottom: 250px;
  .wave {
    @media screen and (min-width: 450px) {
      height: 300px;
    }
    @media screen and (min-width: 768px) {
      height: 400px;
    }
    height: 250px;
    z-index: 0;
  }
`;

const StyledPublicState = styled.div`
  & > p {
    color: ${(props) => props.color};
  }
`;

export default function PostHeader({
  id,
  title,
  author,
  category,
  created_at,
  updated_at,
  is_public,
}) {
  const router = useRouter();

  const updatedAt = new Date(updated_at);

  const createdAt = new Date(created_at);

  const { editPost, deletePost } = usePost();

  const client = useSelector(({ auth }) => auth.user.info.name);

  return (
    <>
      <StyledPostHeader>
        <div className="title post-main">
          <h1>{title}</h1>
        </div>
        <div className="sub-title">
          <div className="author">
            <FaPen />
            <span>{author}</span>
          </div>
          <PostDate updatedAt={updatedAt} createdAt={createdAt}></PostDate>
        </div>
        {/* it the client accessed is the owner of the post, the edit and delete interface is visible */}
        {author === client && (
          <div className="sub-title">
            {is_public ? (
              <StyledPublicState
                color={({ theme }) => theme.colors.state.success}
              >
                <FaLockOpen />
                <p>공개</p>
              </StyledPublicState>
            ) : (
              <StyledPublicState color={({ theme }) => theme.colors.state.fail}>
                <FaLock />
                <p>비공개</p>
              </StyledPublicState>
            )}
            <FontButton props={{ onClick: () => editPost(id) }}>
              수정
            </FontButton>
            <FontButton
              props={{
                onClick: () =>
                  deletePost({ id, teardown: () => router.push('/') }),
              }}
            >
              삭제
            </FontButton>
            {category && (
              <CategoryButton name={category}>{category}</CategoryButton>
            )}
          </div>
        )}
      </StyledPostHeader>
      <StyledHeaderWave>
        <Wave
          fill={'#27566B'}
          paused={false}
          className="wave"
          options={{
            height: 70,
            amplitude: 50,
            speed: 0.5,
            points: 2,
          }}
        ></Wave>
      </StyledHeaderWave>
    </>
  );
}
