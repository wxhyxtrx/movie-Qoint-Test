const initialState = {
  url: "https://image.tmdb.org/t/p/w1280",
};

const imageUrl = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    default:
      return {
        ...state,
      };
  }
};
export default imageUrl;
