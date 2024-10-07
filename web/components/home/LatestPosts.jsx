import ResponsivePost from '../minipost/ResponsivePost';
import Poster from '../poster/Poster';

export default function LatestPosts({ posts }) {
  return (
    <Poster
      borderColor={'hsl(237, 46%, 60%)'}
      backgroundColor={'rgba(106, 111, 200, 0.3)'}
      boxShadowProps={{
        type: 'box',
        thickness: 5,
        hsl: { hue: 237, saturation: 46, lightness: 60 },
      }}
    >
      {posts.map((post, index) => {
        return <ResponsivePost key={index} post={post}></ResponsivePost>;
      })}
    </Poster>
  );
}
