import Head from 'next/head';
import styled from 'styled-components';
import usePoster from '../../components/poster/usePoster';
import CategoryPoster from '../../components/category/CategoryPoster';
import CategoryText, {
  StyledCategoryText,
} from '../../components/category/CategoryText';
import OceanWaveButton, {
  StyledOceanWaveButton,
} from '../../components/button/OceanWaveButton';
import { client, server } from '../../api/client';
import { CATEGORY_POSTER_SORT_BUTTON_PROPS } from '../../components/poster/data';
import { flex } from '../../styles/variable';

const StyledCategoryPageHeader = styled.div`
  @media screen and (min-width: 450px) {
    font-size: 16px;
  }
  @media screen and (min-width: 768px) {
    justify-content: flex-start;
    flex-direction: row;
    font-size: 20px;
    padding: 2em;
  }
  padding: 0 2em 2em 2em;
  ${flex('column', 'center', 'center')};
  font-size: 12px;
  .post-sort-button {
    @media screen and (min-width: 768px) {
      margin-left: 3em;
    }
    display: flex;
    flex-direction: row;
  }
  ${StyledOceanWaveButton} {
    font-family: 'Raleway';
    color: ${({ theme }) => theme.colors.white};
  }
  ${StyledCategoryText} {
    @media screen and (min-width: 768px) {
      margin-bottom: 0em;
    }
    margin-bottom: 0.3em;
    font-size: 3.5em;
  }
`;

const StyledCategoryPageBody = styled.div`
  @media screen and (min-width: 450px) {
    font-size: 10px;
  }
  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
  font-size: 8px;
`;

export default function Name(props) {
  const {
    posts: { results, next },
    categoryName,
  } = props;

  // change the url host server to client
  // after the screen is created, api calls from the client
  const nextPoster =
    next && next.replace(server.defaults.baseURL, client.defaults.baseURL);

  const description = `Experiences in ${categoryName} category Antoliny.`;

  // poster --> a set of posts
  const [poster, lastPostTarget, sortPoster] = usePoster({
    initialPoster: results,
    initialNextPoster: nextPoster,
  });

  return (
    <>
      <Head>
        <title>AnCean Category | {categoryName}</title>
        <meta name="description" content={description} />
      </Head>
      <StyledCategoryPageHeader>
        <CategoryText name={categoryName} />
        <div className="post-sort-button">
          {CATEGORY_POSTER_SORT_BUTTON_PROPS.map((props, index) => {
            return (
              <OceanWaveButton
                key={index}
                {...props.priorityProps}
                props={{ onClick: () => sortPoster(props.query(categoryName)) }}
              >
                {props.name}
              </OceanWaveButton>
            );
          })}
        </div>
      </StyledCategoryPageHeader>
      <StyledCategoryPageBody>
        <CategoryPoster
          poster={poster}
          categoryName={categoryName}
          target={lastPostTarget}
        ></CategoryPoster>
      </StyledCategoryPageBody>
    </>
  );
}

export const getStaticPaths = async () => {
  const response = await server.get('/api/category/');
  const categories = response.data;

  const paths = categories.map((category) => {
    let pathName = category.name;
    return { params: { name: pathName.toLowerCase() } };
  });

  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async ({ params }) => {
  try {
    if (params.length === 0) {
      return { notFound: true };
    }
    // get posts three(limit=3) at a time and only published(is_finish=true) posts
    const response = await server.get(
      `api/posts/?category__name=${params.name}&is_finish=true&limit=3`,
    );

    const categoryPosts = response.data;

    return {
      props: {
        posts: { ...categoryPosts },
        categoryName: params.name.toUpperCase(),
      },
      revalidate: 1,
    };
  } catch (err) {
    return { notFound: true };
  }
};
