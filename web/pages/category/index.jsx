import Head from 'next/head';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import styled from 'styled-components';
import { server } from '../../api/client';
import CategoryCardSwiper from '../../components/category/CategoryCardSwiper';
import SwiperButton from '../../components/button/SwiperButton';
import useCategorySwiper from '../../components/category/useCategorySwiper';
import { CATEGORY_DATA } from '../../components/category/data';
import { flex } from '../../styles/variable';

const StyledCategoryPage = styled.div`
  display: flex;
  height: 100vh;
  overflow: scroll;
  align-items: center;
  background: ${(props) => props.$backgroundColor};
  .swiper-wrapper {
    padding: 2rem 0;
  }
  .swiper-controller {
    ${flex('row', 'space-between')}
  }
`;

const StyledSwiperButtonArea = styled.div`
  @media screen and (min-width: 768px) {
    padding: 1em 2em;
  }
  ${flex('row', 'space-between', 'flex-end')};
  padding: 0;
`;

export default function Index({ categories, categoryPosts }) {
  // check if current activeSlide(slideNumber) is the first or last category
  const [slideNumber, setSlideNumber] = useState(0);

  const { categoryName, onSwiper, onSlideChange } = useCategorySwiper(
    categories,
    (slide) => setSlideNumber(slide.activeIndex),
  );

  return (
    <>
      <Head>
        <title>AnCean | Categories </title>
        <meta name="description" content="All categories of AnCean" />
      </Head>
      <StyledCategoryPage
        $backgroundColor={
          categoryName && CATEGORY_DATA[categoryName]['transparentColor']
        }
      >
        <Swiper
          modules={[EffectCoverflow]}
          slidesPerView={1}
          effect={'coverflow'}
          speed={2000}
          spaceBetween={400}
          coverflowEffect={{
            rotate: 20,
            stretch: 100,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          className="swiper-category"
          onSwiper={onSwiper}
          onSlideChange={onSlideChange}
        >
          {categories.map(({ name }, index) => {
            return (
              <SwiperSlide key={index} data-name={name}>
                <CategoryCardSwiper
                  posts={categoryPosts[name]}
                ></CategoryCardSwiper>
              </SwiperSlide>
            );
          })}
          <StyledSwiperButtonArea>
            <SwiperButton
              color={({ theme }) => theme.colors.mainColor[4]}
              direction="previous"
              currentSlide={slideNumber}
              lastSlideNum={categories.length}
            ></SwiperButton>
            <SwiperButton
              color={({ theme }) => theme.colors.mainColor[4]}
              direction="next"
              currentSlide={slideNumber}
              lastSlideNum={categories.length - 1}
            ></SwiperButton>
          </StyledSwiperButtonArea>
        </Swiper>
      </StyledCategoryPage>
    </>
  );
}

export const getStaticProps = async () => {
  const response = await server.get('/api/category/');
  const categories = response.data;

  let categoryPosts = {};

  for (const category of categories) {
    const response = await server.get(
      `/api/posts/?category__name=${category.name}&limit=5`,
    );
    const { results } = response.data;
    categoryPosts = {
      ...categoryPosts,
      [category.name]: [{ name: category.name }, ...results],
    };
  }

  return { props: { categories, categoryPosts }, revalidate: 10 };
};
