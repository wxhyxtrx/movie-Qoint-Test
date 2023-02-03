const initialState = {
  id: 0,
};

const genreID = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GENRECHECK":
      return {
        ...state,
        id: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default genreID;
