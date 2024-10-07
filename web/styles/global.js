import { createGlobalStyle } from 'styled-components';
import FontsCSS from './fonts';
import EditorCSS from './editor';
import SwiperCSS from './swiper';

export const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    line-height: 1.6;
    font-size: 16px;
    background-color: #fff;
    max-width: 2048px;
    min-width: 280px;
    margin-left: auto;
    margin-right: auto;
  }
  p {
    margin: 0;
  }
  @media only screen and (min-width: 280px) {
    font-size: 30px;
    h1 {
      font-size: 500px;
    }
    h5 {
      font-size: 12px;
    }
  }

  main {
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
    display: block;
  }

  ul {
    padding-left: 0px;
    list-style: none;
  }

  // IntersectionObserver
  .fade-in-slide-down-suspend {
    opacity: 0;
    transform: translateY(-100px);
    transition: all 1s;
  }
  ${FontsCSS}
  ${SwiperCSS}
  ${EditorCSS}
`;
