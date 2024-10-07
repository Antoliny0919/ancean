import AboutMe from './AboutMe';
import PopularWriting from './PopularWriting';
import TopCategories from './TopCategories';
import LatestPosts from './LatestPosts';

export const HOME_SECTION_DATA = {
  aboutMe: {
    component: AboutMe,
    headerProps: {
      mainTitle: 'About Me',
      subTitle: '프로그래밍 개발과 희로애락을 함께하는 이시현, Antoliny입니다.',
      colorHSL: { hue: 190, saturation: 48, lightness: 59 },
    },
  },
  popularWriting: {
    component: PopularWriting,
    headerProps: {
      mainTitle: 'Popular Writing',
      subTitle: '가장 많은 WAVE를 획득한 포스트입니다.',
      colorHSL: { hue: 215, saturation: 58, lightness: 59 },
    },
  },
  topCategories: {
    component: TopCategories,
  },
  latestPosts: {
    component: LatestPosts,
    headerProps: {
      mainTitle: 'Latest Posts',
      subTitle: '',
      colorHSL: { hue: 237, saturation: 46, lightness: 56 },
      style: { alignItems: 'flex-start' },
    },
  },
};
