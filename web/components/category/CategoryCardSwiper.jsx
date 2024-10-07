import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCards } from 'swiper/modules';
import PostCard from '../minipost/PostCard';
import CategoryCard from './CategoryCard';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

const StyledCategoryCardSwiper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${(props) => props.background};
  transition: background 1s;
  .post-cards-effect .swiper-wrapper {
    height: auto;
    box-sizing: content-box;
  }
  .swiper-cards {
    padding: 15px 0;
    width: 270px;
  }
  .swiper-slide {
    overflow: visible;
    aspect-ratio: 100 / 140;
  }
  .swiper-pagination {
    display: flex;
    z-index: 0;
    width: 100%;
  }
  // pagination button style
  .swiper-pagination-bullet {
    flex: 1 0 0;
    width: var(
      --swiper-pagination-bullet-width,
      var(--swiper-pagination-bullet-size, 8px)
    );
    height: var(
      --swiper-pagination-bullet-height,
      var(--swiper-pagination-bullet-size, 5px)
    );
    display: inline-block;
    border-radius: 3px;
    background: var(--swiper-pagination-bullet-inactive-color, #000);
    opacity: var(--swiper-pagination-bullet-inactive-opacity, 0.2);
  }
  .swiper-pagination-bullet-active {
    opacity: var(--swiper-pagination-bullet-opacity, 1);
    background: var(
      --swiper-pagination-color,
      ${({ theme }) => theme.colors.mainColor[4]}
    );
  }
`;

export default function CategoryCardSwiper({ posts }) {
  const pagination = {
    clickable: true,
    renderBullet: function () {
      return '<span class="' + 'swiper-pagination-bullet' + '">' + '</span>';
    },
  };

  return (
    <StyledCategoryCardSwiper>
      <Swiper
        pagination={pagination}
        grabCursor={true}
        modules={[Pagination, EffectCards]}
        className="post-cards-effect"
        effect={'cards'}
        cardsEffect={{
          perSlideOffset: 10,
          perSlideRotate: 5,
        }}
      >
        {posts.map((post, index) => {
          // CategoryCardSwiper is always the first card means category(CategoryCard) and the rest cards
          // are posts with that category(PostCard). --> like a card deck style
          return (
            <SwiperSlide key={index}>
              {index === 0 ? (
                <CategoryCard
                  color={post.color}
                  name={post.name}
                ></CategoryCard>
              ) : (
                <PostCard post={post} />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </StyledCategoryCardSwiper>
  );
}
