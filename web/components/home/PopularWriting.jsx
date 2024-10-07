import styled from 'styled-components';
import Wave from 'react-wavify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import NewsStylePost from '../minipost/NewsStylePost';
import 'swiper/css';
import 'swiper/css/navigation';

const StyledPopularWritingArea = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  width: 100%;
`;

const ContentArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  .wave {
    height: 25em;
    bottom: 0;
    position: absolute;
    max-width: 2048px;
    z-index: 0;
  }
`;

const StyledPostSwiper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .slide-news-style-post {
    padding: 5rem 3rem;
  }
  .swiper-slide {
    width: 100%;
  }
`;

export default function PopularWriting({ posts }) {
  return (
    <StyledPopularWritingArea>
      <ContentArea>
        <StyledPostSwiper className="fade-in-slide-down-suspend">
          <Swiper
            modules={[Navigation]}
            className="slide-news-style-post"
            spaceBetween={500}
            breakpoints={{
              768: {
                slidesPerView: 1,
              },
              1024: {
                // if posts length 1 --> slidesPerView 2 meaningless
                slidesPerView: posts.length === 1 ? 1 : 2,
                spaceBetween: 20,
              },
            }}
          >
            {posts.map((item, index) => (
              <SwiperSlide key={index}>
                <NewsStylePost
                  postData={item}
                  // odd, even index post different style apply
                  rotate={index % 2 === 0 ? 'under-degree' : 'up-degree'}
                ></NewsStylePost>
              </SwiperSlide>
            ))}
          </Swiper>
        </StyledPostSwiper>
        {posts.length !== 0 && (
          <Wave
            fill={'#27566B'}
            paused={false}
            className="wave"
            options={{
              height: 40,
              amplitude: 70,
              speed: 0.5,
              points: 2,
            }}
          ></Wave>
        )}
      </ContentArea>
    </StyledPopularWritingArea>
  );
}
