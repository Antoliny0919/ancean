// import Link from 'next/link';
import styled from 'styled-components';
import Paragraph from './item/Paragraph';
import Header from './item/Header';
import Code from './item/Code';
import Quote from './item/Quote';
import Warning from './item/Warning';
import ImageTool from './item/ImageTool';

const StyledPostContent = styled.div`
  position: relative;
  bottom: 100px;
  padding: 0 1em;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Pretendard-Light';
`;

// const StyledMoveQuoteSidebar = styled.div`
//   @media screen and (max-width: 1280px) {
//     display: none;
//   }
//   position: sticky;
//   font-family: 'NanumBarunGothic';
//   top: 100px;
//   left: 80%;
//   z-index: 10;
//   width: 240px;
//   padding: 1rem 0;
//   font-size: 12px;
//   border-left: solid ${({ theme }) => theme.colors.mainColor[4]} 3px;
//   .move-quote-text {
//     margin-left: 10px;
//     padding: 0.2rem 0;
//     transition:
//       transform 0.7s,
//       color 0.7s;
//     color: ${({ theme }) => theme.colors.lightGray};
//   }
//   .move-quote-text:hover {
//     transform: scale(1.05);
//     color: ${({ theme }) => theme.colors.gray};
//   }
// `;

export default function PostContent({ content }) {
  // content is array type so find out if content exists through length properties
  const haveContent = content.length;

  // const contentTypes = content.map((item) => {
  //   let { type } = item;
  //   return type;
  // });

  // if content have quote block --> quote side bar component create(StyledMoveQuoteSidebar)
  // const haveQuote = contentTypes.includes('quote');

  // components parsed for each block type of content
  const parser = {
    paragraph: (data) => {
      let { text } = data;
      return <Paragraph>{text}</Paragraph>;
    },
    header: (data) => {
      let { text, level } = data;
      return <Header level={level}>{text}</Header>;
    },
    code: (data) => {
      let { code } = data;
      return <Code>{code}</Code>;
    },
    quote: (data) => {
      const { text } = data;
      return <Quote>{text}</Quote>;
    },
    warning: (data) => {
      const { message, title } = data;
      return <Warning message={message} title={title}></Warning>;
    },
    image: (data) => {
      const { file } = data;
      return <ImageTool url={file.url}></ImageTool>;
    },
  };

  return (
    <>
      {/* {haveQuote && (
        <StyledMoveQuoteSidebar>
          {content.map(({ data, type }, index) => {
            if (type === 'quote') {
              const { text } = data;
              return (
                <div className="move-quote-text" key={index}>
                  <Link href={`#${text}`}>{text}</Link>
                </div>
              );
            }
          })}
        </StyledMoveQuoteSidebar>
      )} */}
      {haveContent !== 0 ? (
        <>
          <StyledPostContent>
            {content.map(({ data, type }) => {
              return parser[type](data);
            })}
          </StyledPostContent>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
