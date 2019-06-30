// react library
import React from 'react';

// third-party library
import ReactPagination from 'react-paginate';

// style
import './Pagination.scss';

const Pagination = ({
  pageCount,
  currentPage,
  limit,
  onPageChange
}) => (
  <ReactPagination 
    previousLabel="previous"
    nextLabel="next"
    breakLabel={ <a href="pagination">...</a> }
    breakClassName="break-me"
    pageCount={ pageCount }
    marginPagesDisplayed={ currentPage }
    pageRangeDisplayed={ limit }
    onPageChange={ onPageChange }
    containerClassName="pagination"
    subContainerClassName="pages pagination"
    activeClassName="active"
    />
)

export default Pagination;