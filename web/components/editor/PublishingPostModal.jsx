import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { uploadHeaderImage } from './modules/editor';
import useEditor from './useEditor';
import Top from './\bpublishing-post-modal/Top';
import Bottom from './\bpublishing-post-modal/Bottom';

const StyledPublishingPostModal = styled.div`
  position: absolute;
  font-family: 'NanumBarunGothic';
  background-color: ${({ theme }) => theme.colors.white};
  bottom: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  transform: translateY(100vh);
  transition: transform 1s;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  position: fixed;
  overflow: scroll;
  &.on {
    transform: translateY(0vh);
  }
  .content-area {
    @media screen and (min-width: 450px) {
      font-size: 12px;
    }
    @media screen and (min-width: 768px) {
      font-size: 16px;
    }
    width: 768px;
    display: flex;
    flex-direction: column;
    font-size: 10px;
    .divide-line {
      width: 100%;
      margin: 15px 0;
      height: 3px;
      background-color: ${({ theme }) => theme.colors.mainColor[4]};
    }
  }
`;

export default function PublishingPostModal({ state, close }) {
  const { headerImage, headerImagePath } = useSelector(({ editor }) => editor);

  const { imageUploader } = useEditor();

  return (
    <StyledPublishingPostModal className={state && 'on'}>
      <div className="content-area">
        <Top
          headerImage={headerImage}
          headerImagePath={headerImagePath}
          onSelectedImageFile={(e) =>
            imageUploader(e.target.files[0], uploadHeaderImage, true)
          }
        />
        <div className="divide-line"></div>
        <Bottom close={close} />
      </div>
    </StyledPublishingPostModal>
  );
}
