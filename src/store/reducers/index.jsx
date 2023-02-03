import { combineReducers } from "redux";
import imageUrl from "./imageUrl";
import videoGenre from "./videoGenre";
import genreID from "./genreID";
// Untuk sementara, kita baru memiliki 1 reducer, yaitu transactionReducer
export default combineReducers({
  imageUrl,
  videoGenre,
  genreID,
});
