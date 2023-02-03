const initialState = {
  movies: [],
};

const videoGenre = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "VIDEOGENRE":
      return {
        ...state,
        movies: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default videoGenre;
