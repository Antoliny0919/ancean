import { useState, useCallback, useMemo } from 'react';

export default function useCategorySwiper(
  categories,
  slideChangeExtraAction = null,
) {
  const [categoryName, setCategoryName] = useState();

  const categoryCount = useMemo(() => {
    return categories.length;
  }, [categories]);

  const onSwiper = useCallback(
    (slide) => {
      // called when swiper was frist created
      if (categoryCount !== 0) {
        changeCategory(slide);
      }
    },
    [categories],
  );

  const onSlideChange = useCallback(
    (slide) => {
      // identify the current slide category name each time the slide change and apply the style to that category
      if (categoryCount !== 0) {
        changeCategory(slide);
        // when slide change any extra action need context to props (function)
        slideChangeExtraAction && slideChangeExtraAction(slide);
      }
    },
    [categories],
  );

  // swiper slide change call changeCategory method (onSlideChange, onSwiper)
  const changeCategory = useCallback(
    (slide) => {
      let activeSlideNum = slide.activeIndex;
      let slides = slide.slides;
      // get the category name of the current slide from the changed slide
      let { name } = slides[activeSlideNum].dataset;
      setCategoryName(name);
    },
    [categories],
  );

  return { categoryName, onSwiper, onSlideChange };
}
