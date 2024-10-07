import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useEditor from '../useEditor';
import RadioInput from '../../common/RadioInput';
import FontButton from '../../button/FontButton';
import CommonButton from '../../button/CommonButton';
import { forcedChangeValue } from '../modules/editor';
import Date from '../../common/Date';
import { flex } from '../../../styles/variable';

const StyledMainArea = styled.div`
  padding: 0 1em;
  font-size: inherit;
`;

export const StyledPostInfoField = styled.div`
  width: 100%;
  ${flex('row', 'flex-start', 'center')};
  font-size: inherit;
  margin-bottom: 1em;
  padding-bottom: 0.5em;
  border-bottom: solid ${({ theme }) => theme.colors.lightGray} 1px;
  & > * {
    margin-right: 2em;
    display: flex;
  }
  .field-name {
    @media screen and (min-width: 768px) {
      width: 15%;
      flex-direction: row;
    }
    font-size: inherit;
    width: 40%;
    flex-direction: row-reverse;
  }
  .field-name > p {
    background-color: ${({ theme }) => theme.colors.mainColor[4]};
    color: ${({ theme }) => theme.colors.lightWhite};
    padding: 0.2em 0.7em;
    border-radius: 10px;
  }
`;

const StyledFooterArea = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 1rem 1.5rem;
  & > * {
    margin-left: 2rem;
  }
`;

export default function Bottom({ close }) {
  // first time publishing a post(isFinish field --> true)
  // works even if the frist published post has already been modified

  const dispatch = useDispatch();

  const publishingDate = Date();

  const { save } = useEditor();

  const client = useSelector(({ auth }) => auth.user.info.name);

  const setPublic = (state) => {
    dispatch(forcedChangeValue({ name: 'isPublic', value: state }));
  };

  // publishingPostModal bottom area infoFields data
  const infoField = [
    {
      title: '공개설정',
      content: (
        <>
          <RadioInput
            checkedColor={({ theme }) => theme.colors.mainColor[4]}
            props={{ defaultChecked: true, onClick: () => setPublic(true) }}
          >
            공개
          </RadioInput>
          <RadioInput
            checkedColor={({ theme }) => theme.colors.mainColor[4]}
            props={{ onClick: () => setPublic(false) }}
          >
            비공개
          </RadioInput>
        </>
      ),
    },
    {
      title: '출간일',
      content: (
        <>
          {publishingDate && (
            <p>
              {publishingDate.getFullYear()}년 {publishingDate.getMonth() + 1}월{' '}
              {publishingDate.getDate()}일
            </p>
          )}
        </>
      ),
    },
    {
      title: '작성자',
      content: <p>{client}</p>,
    },
  ];

  return (
    <>
      <StyledMainArea>
        {infoField.map((info, index) => {
          return (
            <StyledPostInfoField key={index}>
              <div className="field-name">
                <p>{info.title}</p>
              </div>
              {info.content}
            </StyledPostInfoField>
          );
        })}
      </StyledMainArea>
      <StyledFooterArea>
        {/* isFinish --> true(publishing) */}
        <CommonButton
          props={{
            onClick: () => save(true),
          }}
        >
          출간하기
        </CommonButton>
        <FontButton
          props={{
            onClick: () => {
              close();
            },
          }}
        >
          취소
        </FontButton>
      </StyledFooterArea>
    </>
  );
}
