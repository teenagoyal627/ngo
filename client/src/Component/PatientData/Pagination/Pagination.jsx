import React from "react";
import './Pagination.css'
const Pagination = ({
  currentPage,
  setCurrentPage,
  numberOfPages,
  numbers,
}) => {
  const presentPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div>
      <nav className="pagination1">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={presentPage}>
              Prev
            </button>
          </li>
          {numbers.map((n, i) => (
            <li
              key={n}
              className={`page-item ${currentPage === n ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => changePage(n)}>
                {i}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button className="page-link" onClick={nextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
