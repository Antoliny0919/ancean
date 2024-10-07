import { css } from 'styled-components';

const EditorCSS = css`
  // paragrapth <p/>
  .ce-paragraph {
    @media screen and (min-width: 768px) {
      font-size: 16px;
    }
    font-family: 'Pretendard-Light';
    padding: 0.3em 0;
    font-size: 14px;
    max-width: 768px;
    line-height: 1.6em;
    margin-left: auto;
    margin-right: auto;
    outline: none;
  }

  // ce-block__content --> <h/>tag, <code/>
  .ce-block__content .ce-header {
    font-family: 'Pretendard-Bold';
    padding: 0.3em 0 0.3em;
    line-height: 1.25em;
    outline: none;
  }

  // ce-header --> <h/> tag
  // default <h/> tag font-size used em, but default font size is to small(16px) so <h4, 5, 6> tag is are too small
  h1.ce-header {
    @media screen and (min-width: 768px) {
      font-size: 36px;
    }
    font-size: 30px;
  }
  h2.ce-header {
    @media screen and (min-width: 768px) {
      font-size: 30px;
    }
    font-size: 26px;
  }
  h3.ce-header {
    @media screen and (min-width: 768px) {
      font-size: 26px;
    }
    font-size: 22px;
  }
  h4.ce-header {
    @media screen and (min-width: 768px) {
      font-size: 22px;
    }
    font-size: 18px;
  }
  h5.ce-header {
    @media screen and (min-width: 768px) {
      font-size: 18px;
    }
    font-size: 16px;
  }
  h6.ce-header {
    @media screen and (min-width: 768px) {
      font-size: 16px;
    }
    font-size: 14px;
  }

  .ce-block__content {
    position: relative;
    max-width: 768px;
    margin: 7px 0;
    margin: 0 auto;
    -webkit-transition: background-color 0.15s ease;
    transition: background-color 0.15s ease;
  }

  .ce-block__content > .ce-code {
    margin: 1.5rem 0;
  }

  .cdx-block > a {
    color: rgba(66, 124, 190, 0.7);
    transition: color 0.7s;
    text-decoration: underline;
    font-weight: 900;
  }

  .cdx-block > a:hover {
    color: rgba(66, 124, 190, 1);
  }

  .cdx-block > .cdx-marker {
    background-color: rgba(66, 124, 190, 0.2);
  }

  .cdx-block > .inline-code {
    background: rgba(66, 177, 190, 0.2);
    color: rgba(66, 177, 190, 1);
    padding: 3px 4px;
    border-radius: 5px;
    margin: 0 1px;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.3px;
  }

  .ce-code__textarea {
    resize: none;
  }

  // quote default style remove
  .cdx-quote__caption {
    display: none;
  }

  .cdx-quote .cdx-quote__text {
    padding: 0;
    border: none;
    webkit-box-shadow: none;
    box-shadow: none;
    min-height: 0;
    margin-bottom: 0;
  }

  .cdx-quote > .cdx-quote__text::before {
    display: none;
  }

  // quote

  .ce-block__content > .cdx-quote {
    font-family: 'Pretendard-Bold';
    margin: 1.5rem 0;
    padding: 0.7rem 0.7rem 0.7rem 1.5rem;
    border-left: solid ${({ theme }) => theme.colors.code.headerBackground} 4px;
    background-color: ${({ theme }) => theme.colors.code.contentBackground};
  }

  .cdx-quote,
  .cdx-warning__title {
    @media screen and (min-width: 768px) {
      font-size: 20px;
    }
    font-size: 16px;
  }

  // editorJS(Warning Block)

  .ce-block__content > .cdx-warning {
    margin: 1.5rem 0;
    padding: 0;
  }
  .ce-block__content > .cdx-warning::before {
    background-image: none;
  }
  .cdx-warning > .cdx-warning__title::before {
    display: none;
  }

  .cdx-warning > .cdx-warning__message::before {
    display: none;
  }

  .cdx-warning__title {
    display: flex;
    align-items: center;
    font-family: 'Pretendard-Bold';
    padding: 10px 12px;
    border: none;
    border-radius: 0;
    border: solid ${({ theme }) => theme.colors.warning.light} 1px;
    border-left: solid ${({ theme }) => theme.colors.warning.light} 4px;
    color: ${({ theme }) => theme.colors.warning.light};
  }

  .cdx-warning > .cdx-warning__title {
    margin-bottom: 0;
  }

  .cdx-warning__message {
    background-color: rgba(255, 219, 40, 0.2);
    color: ${({ theme }) => theme.colors.warning.shallow};
  }

  .cdx-warning > .cdx-warning__message {
    @media screen and (min-width: 768px) {
      font-size: 16px;
      padding: 14px 16px;
    }
    border: none;
    border-radius: 0;
    font-size: 14px;
    font-family: 'Pretendard-Light';
    padding: 10px 12px;
    min-height: 0;
  }

  // editorJS(Image Block)

  .image-tool {
    --bg-color: #cdd1e0;
    --front-color: #388ae5;
    --border-color: #e8e8eb;
  }

  .image-tool__image {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .image-tool__caption {
    display: none;
  }

  .image-tool__image-picture {
    max-width: 100%;
    vertical-align: bottom;
    display: block;
  }

  // eidtor Toolbar

  .ce-toolbar__content {
    max-width: 768px;
  }
  .ce-toolbar__actions {
    right: auto;
  }
  .ce-toolbar__plus {
    position: static;
    z-index: 2;
    width: 36px;
    height: 36px;
    background-color: #fff;
    border: 1px solid #e8e8eb;
    box-shadow: 0 3px 15px -3px #0d142121;
  }
  .ce-toolbar__settings-btn {
    position: static;
    width: 36px;
    height: 36px;
    z-index: 2;
    background-color: #fff;
    border: 1px solid #e8e8eb;
    box-shadow: 0 3px 15px -3px #0d142121;
  }

  .image-tool__image {
    margin-left: auto;
    margin-right: auto;
  }
  .image-tool-filled {
    display: flex;
    justify-content: center;
  }
`;

export default EditorCSS;
