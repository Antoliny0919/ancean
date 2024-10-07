import Head from 'next/head';
import styled from 'styled-components';
import { server, client } from '../../api/client';
import Poster from '../../components/poster/Poster';
import SignatureText, {
  StyledSignatureText,
} from '../../components/common/SignatureText';
import OceanWaveButton, {
  StyledOceanWaveButton,
} from '../../components/button/OceanWaveButton';
import ResponsivePost from '../../components/minipost/ResponsivePost';
import usePoster from '../../components/poster/usePoster';
import { POSTER_SORT_BUTTON_PROPS } from '../../components/poster/data';
import { flex } from '../../styles/variable';

const StyledCategoryPageArea = styled.div`
  @media screen and (min-width: 768px) {
    padding: 3em 5em;
  }
  padding: 0;
`;

const StyledCategoryPageHeader = styled.div`
  @media screen and (min-width: 768px) {
    justify-content: flex-start;
    flex-direction: row;
  }
  ${flex('column', 'center', 'center')};
  font-family: 'Pretendard-Bold';
  .logo {
    width: 15%;
    height: 15%;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  .post-sort-button {
    @media screen and (min-width: 768px) {
      margin: 0;
    }
    display: flex;
    margin: 0 0 2em 0;
  }
  ${StyledSignatureText} {
    @media screen and (min-width: 768px) {
      font-size: 74px;
      letter-spacing: 10px;
      margin: 0.5em 0.5em 0.5em 0;
    }
    @media screen and (min-width: 1024px) {
      font-size: 100px;
      letter-spacing: 15px;
    }
    font-size: 50px;
    letter-spacing: 7px;
    margin: 0.5em 0;
  }
  ${StyledOceanWaveButton} {
    @media screen and (min-width: 768px) {
      font-size: 12px;
    }
    @media screen and (min-width: 1024px) {
      font-size: 16px;
    }
    margin-right: 30px;
    font-family: 'Raleway';
    font-size: 10px;
  }
`;

export default function index({ posts }) {
  const { results, next } = posts;

  const nextPoster =
    next && next.replace(server.defaults.baseURL, client.defaults.baseURL);

  const [poster, lastPostTarget, sortPoster] = usePoster({
    initialPoster: results,
    initialNextPoster: nextPoster,
  });

  return (
    <>
      <Head>
        <title>AnCean | Posts</title>
        <meta name="description" content="All of Antoliny's experiences" />
      </Head>
      <StyledCategoryPageArea>
        <StyledCategoryPageHeader>
          <SignatureText
            fontSize={24}
            colorHSL={{ hue: 202, saturation: 77, lightness: 25 }}
          >
            POSTS
          </SignatureText>
          {/* button have post sort function */}
          <div className="post-sort-button">
            {POSTER_SORT_BUTTON_PROPS.map((props, index) => {
              return (
                <OceanWaveButton
                  key={index}
                  {...props.priorityProps}
                  props={{ onClick: () => sortPoster(props.query) }}
                >
                  {props.name}
                </OceanWaveButton>
              );
            })}
          </div>
        </StyledCategoryPageHeader>
        <Poster
          borderColor={'hsl(202, 77%, 21%)'}
          backgroundColor={'rgba(21, 91, 130, 0.3)'}
          boxShadowProps={{
            type: 'box',
            thickness: 10,
            hsl: { hue: 202, saturation: 77, lightness: 21 },
          }}
          target={lastPostTarget}
        >
          {poster.map((post, index) => {
            return (
              <ResponsivePost
                key={index}
                post={post}
                // reference only last post because to implement inifinite scrolling of usePoster
                // (get posts in limit units of query)
                props={
                  poster.length === index + 1 ? { ref: lastPostTarget } : {}
                }
              />
            );
          })}
        </Poster>
      </StyledCategoryPageArea>
    </>
  );
}

export const getStaticProps = async () => {
  const response = await server.get(
    '/api/posts/?ordering=-created-at&limit=3',
  );
  const posts = response.data;

  return { props: { posts: posts }, revalidate: 10 };
};
