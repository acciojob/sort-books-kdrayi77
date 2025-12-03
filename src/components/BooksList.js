import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, setSortBy, setSortOrder } from "../redux/actions";

const BooksList = () => {
  const dispatch = useDispatch();

  const { books, sortBy, sortOrder, loading } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Sort books
  const sortedBooks = [...books].sort((a, b) => {
    const fieldA = a[sortBy].toLowerCase();
    const fieldB = b[sortBy].toLowerCase();

    if (sortOrder === "asc") return fieldA.localeCompare(fieldB);
    return fieldB.localeCompare(fieldA);
  });

  return (
    <div>
      <h1>Books List</h1>

      {/* EXACT DOM structure Cypress expects */}
      <div>
        <div>
          <label>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="publisher">Publisher</option>
          </select>
        </div>

        <div>
          <label>Order:</label>
          <select
            value={sortOrder}
            onChange={(e) => dispatch(setSortOrder(e.target.value))}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
            </tr>
          </thead>

          <tbody>
            {sortedBooks.map((b) => (
              <tr key={b.primary_isbn13}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.publisher}</td>
                <td>{b.primary_isbn13}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BooksList;
