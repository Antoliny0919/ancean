import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import styled from 'styled-components';
import FlipCategoryCard from '../category/FlipCategoryCard';
import HomeSectionHeader from './SectionHeader';
import useCategorySwiper from '../category/useCategorySwiper';
import { CATEGORY_DATA } from '../category/data';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

const StyledTopCategoriesArea = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.$backgroundColor};
  padding-top: 3rem;
  padding-bottom: 3rem;
  transition: background 1s;
  .swiper-category {
    @media screen and (min-width: 768px) {
      padding-top: 2rem;
      padding-bottom: 2rem;
    }
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export default function TopCategories({ categories }) {
  const { categoryName, onSwiper, onSlideChange } =
    useCategorySwiper(categories);

  return (
    <StyledTopCategoriesArea
      $backgroundColor={
        categoryName && CATEGORY_DATA[categoryName]['transparentColor']
      }
    >
      <HomeSectionHeader
        mainTitle={'Top Categories'}
        subTitle={'최근 가장 많은 게시글이 있는 카테고리 입니다.'}
        colorHSL={{ hue: 181, saturation: 81, lightness: 40 }}
      />
      <div className="fade-in-slide-down-suspend">
        <Swiper
          modules={[EffectCoverflow, Autoplay]}
          effect={'coverflow'}
          slideToClickedSlide={true}
          centeredSlides={true}
          // the loop property is affected by the slidesPerView value and must exist in a certain number to apply
          // so it's applied when the number of categories increases
          // loop={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 100,
            depth: 200,
            modifier: 0.5,
            slideShadows: false,
          }}
          breakpoints={{
            280: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="swiper-category"
          autoplay={{ delay: 30000 }}
          onSwiper={onSwiper}
          onSlideChange={onSlideChange}
        >
          {categories.map(({ name, color, post_count }, index) => (
            <SwiperSlide key={index} data-name={name}>
              {({ isActive }) => (
                <FlipCategoryCard
                  name={name}
                  color={color}
                  postCount={post_count}
                  props={{ $isActive: isActive }}
                ></FlipCategoryCard>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </StyledTopCategoriesArea>
  );
}
