
export const FETCH_BOOKS_REQUEST = "FETCH_BOOKS_REQUEST";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
export const FETCH_BOOKS_ERROR = "FETCH_BOOKS_ERROR";
export const SET_SORT_BY = "SET_SORT_BY";
export const SET_SORT_ORDER = "SET_SORT_ORDER";

export const fetchBooks = () => async (dispatch) => {
  dispatch({ type: FETCH_BOOKS_REQUEST });

  try {
    const res = await fetch(
      "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=ylACe35aZIz6L8U3JgD7TW1nnEHH3qvq"
    );
    const data = await res.json();

    // Extract the list "Hardcover Fiction"
    const hardcoverList = data.results.lists.find(
      (list) => list.list_name === "Hardcover Fiction"
    );

    if (!hardcoverList) {
      throw new Error("List not found");
    }

    // Format the books
    const formatted = hardcoverList.books.map((b) => ({
      title: b.title,
      author: b.author,
      publisher: b.publisher,
      primary_isbn13: b.primary_isbn13
    }));

    dispatch({ type: FETCH_BOOKS_SUCCESS, payload: formatted });
  } catch (err) {
    console.error("Fetch error:", err);
    dispatch({ type: FETCH_BOOKS_ERROR });
  }
};

export const setSortBy = (value) => ({
  type: SET_SORT_BY,
  payload: value
});

export const setSortOrder = (value) => ({
  type: SET_SORT_ORDER,
  payload: value
});
