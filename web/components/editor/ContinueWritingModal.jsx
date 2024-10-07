import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaExclamation } from 'react-icons/fa';
import { FcIdea } from 'react-icons/fc';
import styled from 'styled-components';
import CommonButton from '../button/CommonButton';
import useModal from '../../hooks/useModal';
import BaseModal from '../modal/BaseModal';
import { getRetrievePost } from './modules/editor';
import { StyledCommonButton } from '../button/CommonButton';
import { flex } from '../../styles/variable';

const StyledContinueWritingPostModal = styled.div`
  @media screen and (min-width: 450px) {
    font-size: 8px;
  }
  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
  ${flex('column', 'center', 'center')};
  font-size: 6px;
  padding: 1em 3em;
  height: 100%;
  .logo {
    width: 20%;
    height: 20%;
  }
  .header {
    display: flex;
    align-items: center;
    margin-top: 1em;
    margin-bottom: 1em;
    div {
      font-size: inherit;
      font-weight: 900;
    }
    svg {
      color: red;
    }
  }
  .content {
    font-size: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1em;
  }
  .footer {
    button + button {
      margin-left: 1.5em;
    }
  }
  ${StyledCommonButton} {
    font-size: inherit;
    padding: 0.5em 1em;
    min-width: 5em;
  }
`;

export default function ContinueWritingModal() {
  const dispatch = useDispatch();

  const accessToken = useSelector(({ auth }) => auth.user.token.access);

  const { state, open, close } = useModal(false);

  const continueWriting = () => {
    // get beingWrittenPostId data from localStorage
    // get post data from the obtained post id and create a state that can be written continuosly
    const headers = { Authorization: `Bearer ${accessToken}` };
    const previousWritingPostId = localStorage.getItem('beingWrittenPostId');
    dispatch(getRetrievePost({ id: previousWritingPostId, headers }));
  };

  const newWriting = () => {
    // considered to be creating a new post
    localStorage.removeItem('beingWrittenPostId');
  };

  useEffect(() => {
    const previousWritingPostId = localStorage.getItem('beingWrittenPostId');
    if (accessToken && previousWritingPostId) {
      open();
    }
  }, [accessToken]);

  return (
    <BaseModal state={state}>
      <StyledContinueWritingPostModal>
        <FcIdea className="logo" />
        <div className="header">
          <p>이전에 작성중이던 포스트가 존재합니다</p>
          <FaExclamation />
        </div>
        <div className="content">
          <p>계속해서 작성을 이어가시려면 &#39;예&#39;를 클릭해주세요.</p>
          <p>&#39;아니오&#39;를 클릭할시 새로운 포스트를 작성하게 됩니다.</p>
        </div>
        <div className="footer">
          <CommonButton props={{ onClick: () => close(continueWriting) }}>
            예
          </CommonButton>
          <CommonButton props={{ onClick: () => close(newWriting) }}>
            아니오
          </CommonButton>
        </div>
      </StyledContinueWritingPostModal>
    </BaseModal>
  );
}
