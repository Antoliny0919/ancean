import Head from 'next/head';
import { server } from '../../api/client';
import PostContent from '../../components/post/PostContent';
import PostHeader from '../../components/post/PostHeader';
import AuthGateway from '../../components/auth/AuthGateway';

export default function Post({ post }) {
  // list with single data answered because id data exists in query(getStaticProps)
  const { title, introduce, content } = post;
  return (
    <>
      <Head>
        <title>{title} | AnCean</title>
        <meta name="description" content={introduce} />
      </Head>
      <AuthGateway>
        <PostHeader {...post}></PostHeader>
        <PostContent content={content.blocks}></PostContent>
      </AuthGateway>
    </>
  );
}

export const getServerSideProps = async (context) => {
  let accessToken;
  if (context.req.cookies.refresh) {
    const issueToken = await server.post('/api/token/refresh/', {
      refresh: context.req.cookies.refresh,
    });
    accessToken = issueToken.data;
  }
  const headers = accessToken ? {Authorization: `Bearer ${accessToken["access"]}`} : {};
  try {
    const response = await server.get(`/api/posts/${context.params.id}/`, {
      headers: headers
    });
    const post = response.data;
    console.log(post);

    return { props: { post } };
  } catch (e) {
    console.log(e.response.data);
    // console.log(e.response.data, 'it is data');
    // console.log(e.response.status, 'it is status_code');
    return { notFound: true };
  }
};
