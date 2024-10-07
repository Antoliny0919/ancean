import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaRegTrashCan } from 'react-icons/fa6';
import { getRetrievePost } from './modules/editor';
import usePost from '../post/usePost';
import ModalCloseHeader from '../modal/ModalCloseHeader';
import BaseModal from '../modal/BaseModal';
import * as postAPI from '../../api/post';

const StyledSavedPostsModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 20em;
  h3 {
    margin-top: 0;
    margin-bottom: 2rem;
    border-bottom: solid black 2px;
  }
  .content {
    width: 100%;
    height: 25vw;
    overflow: scroll;
  }
`;

const StyledSavedPost = styled.div`
  display: flex;
  font-size: 15px;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: solid ${({ theme }) => theme.colors.lightGray} 1.5px;
  transition: border-bottom 0.7s;
  width: 100%;
  .date {
    width: 20%;
  }
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 70%;
  }
  .delete {
    width: 10%;
    position: relative;
    display: none;
  }
  & + & {
    margin-top: 1.2rem;
  }
  &:hover {
    cursor: pointer;
    border-bottom: solid ${({ theme }) => theme.colors.mainColor[4]} 1.5px;
  }
  &:hover .delete {
    display: block;
  }
`;

export default function NonePublishedPostsModal({ state, close }) {
  const dispatch = useDispatch();
  // the id of the post currently writing --> exclude posts currently being created

  const beingWrittenPostId =
    typeof window !== 'undefined' &&
    Number(localStorage.getItem('beingWrittenPostId'));

  const user = useSelector(({ auth }) => auth.user.info.name);

  const { deletePost } = usePost();

  // nonePublishedPosts --> publish field value of the model field is false
  const [nonePublishedPosts, setNonePublishedPosts] = useState();

  useEffect(() => {
    const getNonePublishedPosts = async () => {
      const query = `is_finish=False&author__name=${user}`;
      const response = await postAPI.getPost({ query });
      const posts = response.data;
      setNonePublishedPosts(posts);
    };
    state && getNonePublishedPosts();
  }, [state]);

  return (
    <BaseModal state={state}>
      <StyledSavedPostsModal>
        <ModalCloseHeader close={close} />
        <h3>저장된 포스트</h3>
        <div className="content">
          {/* nonePublishedPosts are get after rendering is in progress(call from useEffect) */}
          {nonePublishedPosts &&
            nonePublishedPosts.map((post, index) => {
              let updatedAt = new Date(post.updated_at);
              // except currently writing post
              if (beingWrittenPostId === post.id) return;
              return (
                <StyledSavedPost
                  key={index}
                  id={post.id}
                  onClick={(e) => {
                    dispatch(getRetrievePost({ id: e.currentTarget.id }));
                    close();
                  }}
                >
                  <div className="date">
                    <p>
                      {updatedAt.getFullYear()}.{updatedAt.getMonth() + 1}.
                      {updatedAt.getDate()}
                    </p>
                  </div>
                  <div className="title">
                    <p>제목: {post.title}</p>
                  </div>
                  <div
                    className="delete"
                    id={post.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePost({
                        id: e.currentTarget.id,
                        teardown: () => {
                          close();
                        },
                      });
                    }}
                  >
                    <FaRegTrashCan />
                  </div>
                </StyledSavedPost>
              );
            })}
        </div>
      </StyledSavedPostsModal>
    </BaseModal>
  );
}
