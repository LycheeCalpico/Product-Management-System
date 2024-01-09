import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const PaginationBasic = ({ onPageChange }) => {
  const [active, setActive] = useState(1);
  const handlePageClick = (number) => {
    setActive(number);
    onPageChange(number);
  };
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => handlePageClick(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <Pagination>
      <Pagination.First onClick={() => onPageChange(1)} />
      {items}

      <Pagination.Last />
    </Pagination>
  );
};
export default PaginationBasic;
