import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { FaRegImage } from 'react-icons/fa6';
import Image from '../../common/Image';
import { resetHeaderImageState, changeValue } from '../modules/editor';
import EditorCategorySelect from '../EditorCategorySelect';
import CategoryText from '../../category/CategoryText';
import { flex, miniPostContent } from '../../../styles/variable';

const StyledPostPublishingModalTop = styled.div`
  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
  height: 100%;
  width: 100%;
  ${flex('column', 'center', 'center')};
  h3 {
    margin: 10px;
  }
  .image-block {
    ${flex('column', 'center', 'center')}
    width: 300px;
    aspect-ratio: 1.4 / 1;
    ${(props) =>
      props.$haveHeaderImage
        ? css`
            background-color: ${({ theme }) => theme.colors.white};
          `
        : css`
            background-color: ${({ theme }) => theme.colors.lightGray};
          `}
    font-size: 16px;
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.black};
    img {
      width: inherit;
      height: inherit;
    }
    svg {
      width: 100px;
      height: 100px;
      color: ${({ theme }) => theme.colors.mainColor[4]};
    }
  }
  .post-info {
    width: 60%;
    display: flex;
    flex-direction: column;
    padding-left: 2em;
    .post-category-select {
      @media screen and (min-width: 768px) {
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-around;
        padding: 0.5em 0;
      }
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1em 0;
    }
    h3 {
      margin: 10px 0px;
      width: 100%;
      ${miniPostContent.titleEllipsis()};
    }
    textarea {
      min-height: 100px;
      border: none;
      outline: none;
      resize: none;
    }
  }
`;

const StyledImageSideBar = styled.div`
  @media screen and (min-width: 768px) {
    justify-content: flex-start;
  }
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1em 1em 0 1em;
  font-size: inherit;
  & > * {
    margin-right: 1rem;
    vertical-align: center;
  }
  button {
    border: solid 1.5px ${({ theme }) => theme.colors.mainColor[4]};
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.mainColor[4]};
    transition:
      background-color 0.7s,
      color 0.7s;
  }
  button:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.mainColor[8]};
    background-color: ${({ theme }) => theme.colors.lightWhite};
  }
`;

export default function Top({
  headerImage,
  headerImagePath,
  onSelectedImageFile,
}) {
  const dispatch = useDispatch();

  const { title, selectedCategory, introduce } = useSelector(
    ({ editor }) => editor,
  );

  return (
    <>
      <StyledPostPublishingModalTop $haveHeaderImage={headerImagePath}>
        {/* if the selected headerImage exist show that image or
        not selected headerImage provide the input to select image file */}
        {headerImagePath ? (
          <>
            <div className="image-block">
              <Image src={headerImagePath}></Image>
            </div>
          </>
        ) : (
          <>
            <label htmlFor="file-input" className="image-block">
              <FaRegImage />
              <p>대표이미지 추가</p>
            </label>
            <input
              type="file"
              style={{ display: 'none' }}
              id="file-input"
              onChange={onSelectedImageFile}
            ></input>
          </>
        )}
        <div className="post-info">
          <div className="post-category-select">
            {/* if category selected, show selected category to text */}
            {selectedCategory && (
              <CategoryText
                name={selectedCategory}
                style={{ fontSize: '30px' }}
              ></CategoryText>
            )}
            {/* select category  */}
            <EditorCategorySelect />
          </div>
          <h3>{title}</h3>
          <textarea
            name="introduce"
            placeholder="포스트 썸네일에 들어갈 내용입니다. 포스트에 대해 간단한 설명을 입력해주세요!"
            value={introduce}
            onChange={(e) => dispatch(changeValue(e))}
          ></textarea>
        </div>
      </StyledPostPublishingModalTop>
      {/* if headerImage selected, provide a button to change the headerImage with something else */}
      {headerImagePath && (
        <StyledImageSideBar>
          <p>선택된 이미지: {headerImage}</p>
          <button onClick={() => dispatch(resetHeaderImageState())}>
            이미지 다시 선택
          </button>
        </StyledImageSideBar>
      )}
    </>
  );
}
