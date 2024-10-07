export const CATEGORY_POSTER_SORT_BUTTON_PROPS = [
  {
    name: 'Popular',
    priorityProps: {
      rgb: { red: 102, green: 194, blue: 197 },
      waveOption: {
        height: 5,
        amplitude: 15,
        speed: 0.3,
        points: 2,
      },
    },
    query: (categoryName) =>
      `category__name=${categoryName}&limit=3&ordering=-wave&is_finish=true`,
  },
  {
    name: 'Latest',
    priorityProps: {
      rgb: { red: 58, green: 114, blue: 200 },
      waveOption: {
        height: 10,
        amplitude: 10,
        speed: 0.5,
        points: 2,
      },
    },
    query: (categoryName) =>
      `category__name=${categoryName}&limit=3&ordering=-created_at&is_finish=true`,
  },
];

export const POSTER_SORT_BUTTON_PROPS = [
  {
    name: 'Popular',
    priorityProps: {
      rgb: { red: 102, green: 194, blue: 197 },
      waveOption: {
        height: 5,
        amplitude: 15,
        speed: 0.3,
        points: 2,
      },
    },
    query: `limit=3&ordering=-wave&is_finish=true`,
  },
  {
    name: 'Latest',
    priorityProps: {
      rgb: { red: 58, green: 114, blue: 200 },
      waveOption: {
        height: 10,
        amplitude: 10,
        speed: 0.5,
        points: 2,
      },
    },
    query: `limit=3&ordering=-created_at&is_finish=true`,
  },
];
