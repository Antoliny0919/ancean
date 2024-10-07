import { useState } from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlight';
import { FaRegCopy } from 'react-icons/fa';
import { MdLanguage } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import { flex, shadow } from '../../../styles/variable';
import '@/node_modules/highlight.js/styles/googlecode.css';

const StyledCodeBlock = styled.div`
  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
  font-size: 12px;
  margin-top: 1em;
  margin-bottom: 1em;
  ${shadow.hslShadow({
    type: 'box',
    thickness: 5,
    hsl: { hue: 212, saturation: 65, lightness: 35 },
  })};
  border-radius: 10px;
  pre {
    margin: 0;
  }
  .content {
    padding-bottom: 1rem;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  code {
    height: 100%;
    font-size: inherit;
    background-color: ${({ theme }) => theme.colors.code.contentBackground};
    transition: background-color 0.7s;
  }
`;

const StyledCodeBlockHeader = styled.div`
  @media screen and (min-width: 768px) {
    font-size: 12px;
  }
  ${flex('row', 'space-between', 'center')};
  font-family: 'Pretendard-Bold';
  width: 100%;
  height: 35px;
  font-size: 10px;
  background-color: ${({ theme }) => theme.colors.code.headerBackground};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 0 1.5em;
  .header-left-side {
    @media screen and (min-width: 768px) {
      display: flex;
      align-items: flex-end;
    }
    display: none;
    width: 100%;
    height: 100%;
    .mac-web-interface {
      display: flex;
      align-items: center;
      width: 10%;
      height: 100%;
      margin-right: 10px;
      .circle {
        height: 14px;
        width: 14px;
        border-radius: 50%;
      }
      .circle + .circle {
        margin-left: 10px;
      }
      .close {
        background-color: ${({ theme }) => theme.colors.state.fail};
      }
      .minimise {
        background-color: ${({ theme }) => theme.colors.state.warning};
      }
      .maximise {
        background-color: ${({ theme }) => theme.colors.state.success};
      }
    }
  }
  .header-right-side {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.colors.white};
    svg {
      width: 14px;
      height: 14px;
      margin-right: 5px;
    }
    & > * {
      margin-left: 10px;
    }
    .code-language {
      ${flex('row', 'center', 'center')};
      border-radius: 5px;
      padding: 2.5px 8px;
      background-color: ${({ theme }) =>
        theme.colors.code.languageButtonBackground};
    }
    .copy-code {
      ${flex('row', 'center', 'center')};
      border-radius: 5px;
      padding: 2.5px 8px;
      background-color: ${({ theme }) =>
        theme.colors.code.copyButtonBackground};
      transition:
        color 0.7s,
        background-color 0.7s;
    }
    .copy-code:hover {
      cursor: pointer;
      background-color: ${({ theme }) =>
        theme.colors.code.copyButtonBackgroundHover};
    }
  }
`;

export default function Code({ children }) {
  const [copied, setCopied] = useState(false);

  const [language, code] = children.split('#$*');
  const className = `${language} content`;

  const onClickCopyCode = () => {
    window.navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
      })
      .then(() => {
        setTimeout(() => setCopied(false), 3000);
      });
  };

  return (
    <StyledCodeBlock className="ce-block__content">
      <StyledCodeBlockHeader>
        <div className="header-left-side">
          <div className="mac-web-interface">
            <span className="circle close"></span>
            <span className="circle minimise"></span>
            <span className="circle maximise"></span>
          </div>
        </div>
        <div className="header-right-side">
          <div className="code-language">
            <MdLanguage />
            {language}
          </div>
          <div className="copy-code" onClick={onClickCopyCode}>
            {copied ? (
              <>
                <FaCheck />
                COPIED
              </>
            ) : (
              <>
                <FaRegCopy />
                COPY
              </>
            )}
          </div>
        </div>
      </StyledCodeBlockHeader>
      <Highlight className={className}>{code}</Highlight>
    </StyledCodeBlock>
  );
}
