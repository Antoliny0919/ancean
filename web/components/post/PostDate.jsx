import { FaRegCalendarAlt } from 'react-icons/fa';

export default function PostDate({ updatedAt, createdAt }) {
  const createdAtText = `작성일: ${createdAt.getFullYear()}년${
    createdAt.getMonth() + 1
  }월
            ${createdAt.getDate()}일`;

  const updatedAtText = `최근 수정일: ${updatedAt.getFullYear()}년${
    updatedAt.getMonth() + 1
  }월
            ${updatedAt.getDate()}일`;

  const extractDateReg = new RegExp(/.*[:]/, 'g');

  const ModifiedRecentlyState =
    createdAtText.replace(extractDateReg, '') !==
    updatedAtText.replace(extractDateReg, '');

  return (
    <>
      <div>
        <FaRegCalendarAlt />
        <span>{createdAtText}</span>
      </div>
      {ModifiedRecentlyState && (
        <div>
          <FaRegCalendarAlt />
          <span>{updatedAtText}</span>
        </div>
      )}
    </>
  );
}
