import Poster from '../poster/Poster';
import ResponsivePost from '../minipost/ResponsivePost';
import { CATEGORY_DATA } from './data';

export default function CategoryPoster({
  categoryName,
  poster,
  target = null,
}) {
  const { transparentColor, color, hsl } = CATEGORY_DATA[categoryName];

  return (
    <Poster
      backgroundColor={transparentColor}
      borderColor={color}
      boxShadowProps={{ type: 'box', thickness: 10, hsl }}
    >
      {poster.map((post, index) => {
        return (
          <ResponsivePost
            key={index}
            post={post}
            // reference only last post because to implement inifinite scrolling of usePoster
            // (get posts in limit units of query)
            props={poster.length === index + 1 ? { ref: target } : {}}
          />
        );
      })}
    </Poster>
  );
}
