import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { changeValue } from './modules/editor';
import useInterval from '../../hooks/useInterval';
import useEditor from './useEditor';
import useModal from '../../hooks/useModal';
import NonePublishedPostsModal from './NonePublishedPostsModal';
import PublishingPostModal from './PublishingPostModal';
import FontButton, { StyledFontButton } from '../button/FontButton';
import CommonButton, { StyledCommonButton } from '../button/CommonButton';

const StyledEditor = styled.div`
  @media screen and (min-width: 768px) {
    font-size: 24px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 36px;
  }
  font-size: 16px;
  header {
    position: relative;
    width: 100%;
    font-size: inherit;
    z-index: 10;
    border-bottom: solid ${({ theme }) => theme.colors.mainColor[4]} 2px;
    input {
      width: inherit;
      font-size: inherit;
      border: none;
      outline: none;
    }
    & > * {
      padding: 0.5em 1em 0.5em 1em;
    }
  }
  main {
    padding: 2rem 1rem;
    position: relative;
    z-index: 15;
  }
  footer {
    @media screen and (min-width: 768px) {
      padding: 0.7rem 3rem;
    }
    position: fixed;
    padding: 0.7rem 1em;
    bottom: 0%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.white};
    z-index: 50;
    box-shadow:
      rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px,
      rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px,
      rgba(0, 0, 0, 0.09) 0px -3px 5px;
    .footer-left-item-block {
      button + button {
        margin-left: 3em;
      }
      display: flex;
      border-top-right-radius: 10px;
    }
    ${StyledCommonButton} {
      @media screen and (min-width: 768px) {
        font-size: 16px;
      }
      font-size: 10px;
    }
    ${StyledFontButton} {
      @media screen and (min-width: 768px) {
        font-size: 20px;
      }
      font-size: 12px;
    }
  }
`;

const CustomEditorConfig = dynamic(() => import('./CustomEditorConfig'), {
  ssr: false,
});

const Editor = () => {
  const dispatch = useDispatch();

  const { save, imageUploader } = useEditor();

  const { title, content } = useSelector(({ editor }) => editor);

  const { access } = useSelector(({ auth }) => auth.user.token);

  const nonePublishedPostsModal = useModal(false);

  const publishingPostModal = useModal(false);

  useInterval(() => save(), 600000);

  return (
    <StyledEditor>
      <header>
        <input
          type="text"
          placeholder="제목을 입력해주세요.."
          name="title"
          value={title}
          onChange={(e) => dispatch(changeValue(e))}
        ></input>
      </header>
      <main>
        {access && content && (
          <CustomEditorConfig imageUploader={imageUploader} content={content} />
        )}
      </main>
      <footer>
        {/* leftArea */}
        <div className="footer-left-item-block">
          <FontButton
            props={title ? { onClick: () => save() } : { disabled: true }}
          >
            임시저장
          </FontButton>
          <CommonButton
            props={{ onClick: () => nonePublishedPostsModal.open() }}
          >
            저장된 포스트
          </CommonButton>
          <NonePublishedPostsModal
            state={nonePublishedPostsModal.state}
            close={nonePublishedPostsModal.close}
          ></NonePublishedPostsModal>
        </div>
        {/* rightArea */}
        <div>
          <CommonButton
            props={
              title
                ? { onClick: () => publishingPostModal.open() }
                : { disabled: true }
            }
          >
            출간하기
          </CommonButton>
          <PublishingPostModal
            state={publishingPostModal.state}
            close={publishingPostModal.close}
          />
        </div>
      </footer>
    </StyledEditor>
  );
};

export default Editor;
