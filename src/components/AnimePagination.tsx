import React from "react";
import { Pagination } from "react-bootstrap";
import type { Props } from "../types/AnimeInterface";

const AnimePagination: React.FC<Props> = ({ currentPage, lastPage, onPageChange }) => {
  const pages = [];

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(lastPage, currentPage + 2);

  if (startPage > 1) {
    pages.push(<Pagination.First key="first" onClick={() => onPageChange(1)} />);
    pages.push(<Pagination.Ellipsis key="start-ellipsis" />);
  }

  for (let page = startPage; page <= endPage; page++) {
    pages.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => onPageChange(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  if (endPage < lastPage) {
    pages.push(<Pagination.Ellipsis key="end-ellipsis" />);
    pages.push(<Pagination.Last key="last" onClick={() => onPageChange(lastPage)} />);
  }

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      />
      {pages}
      <Pagination.Next
        onClick={() => onPageChange(Math.min(currentPage + 1, lastPage))}
        disabled={currentPage === lastPage}
      />
    </Pagination>
  )
}

export default AnimePagination