import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ERROR,
  SET_SORT_BY,
  SET_SORT_ORDER
} from "./actions";

const initialState = {
  books: [],
  loading: false,
  error: false,
  sortBy: "title",
  sortOrder: "asc"
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_BOOKS_REQUEST:
      return { ...state, loading: true, error: false };

    case FETCH_BOOKS_SUCCESS:
      return { ...state, loading: false, books: action.payload };

    case FETCH_BOOKS_ERROR:
      return { ...state, loading: false, error: true };

    case SET_SORT_BY:
      return { ...state, sortBy: action.payload };

    case SET_SORT_ORDER:
      return { ...state, sortOrder: action.payload };

    default:
      return state;
  }
}
