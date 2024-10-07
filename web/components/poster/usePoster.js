import { useState, useRef, useEffect } from 'react';
import { client } from '../../api/client';

export default function usePoster({ initialPoster, initialNextPoster }) {
  const [poster, setPoster] = useState(initialPoster);

  // it have a request url to get the next posts;
  const [nextPoster, setNextPoster] = useState(initialNextPoster);

  // reference the last post in poster
  const lastPostTarget = useRef(null);

  // get the next posts in limit units of query
  const readMorePoster = async () => {
    const response = await client.get(nextPoster);
    const poster = response.data;
    return poster;
  };

  // it's get posts sorted by a specific value, and existing poster are initialized
  const sortPoster = async (query) => {
    const response = await client.get(`/api/posts/?${query}`);
    const { next, results } = response.data;
    setPoster([...results]);
    setNextPoster(next);
  };

  useEffect(() => {
    // observe last post --> lastPostTarget
    const lastPostObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(async (entry) => {
          // when see the last post on the screen get next posts data
          if (entry.isIntersecting) {
            let { next, results } = await readMorePoster();
            setNextPoster(next);
            setPoster([...poster, ...results]);
            observer.unobserve(lastPostTarget.current);
          }
        });
      },
      {
        threshold: 0.8,
      },
    );
    // nextPoster === null means already get all posts state
    nextPoster && lastPostObserver.observe(lastPostTarget.current);
  }, [poster, nextPoster]);

  return [poster, lastPostTarget, sortPoster];
}
