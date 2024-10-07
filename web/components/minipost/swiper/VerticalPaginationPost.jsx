import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Post from '../style-row-post/Post';

import 'swiper/css';
import 'swiper/css/pagination';

export default function VerticalPaginationPost({ posts }) {
  return (
    <Swiper
      direction={'vertical'}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="vertical-pagination"
    >
      {posts.map((post, index) => {
        return (
          <SwiperSlide key={index}>
            <Post post={post}></Post>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
