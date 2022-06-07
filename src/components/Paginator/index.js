import React from 'react';
import classNames from 'classnames';
import './index.scss';

const Paginator = props => {
  const middleNumber = Math.ceil(props.totalPages / 2);
  const secondMiddleNumber = middleNumber + 1;

  const firstPagClass = classNames('paginator-numbers-first', {
    active: props.currentPage === 1
  });

  const lastPagClass = classNames('paginator-numbers-last', {
    active: props.currentPage === props.totalPages
  });

  const activeFirstMiddleNumber = classNames({
    active:
      props.currentPage === middleNumber ||
      (props.currentPage > 1 && props.currentPage < middleNumber)
  });

  const activeSecondMiddleNumber = classNames({
    active:
      props.currentPage === secondMiddleNumber ||
      (props.currentPage > secondMiddleNumber && props.currentPage < props.totalPages)
  });

  return (
    <div className={'paginator'}>
      <span onClick={props.prevPageChange} className={'paginator-left-arrow'} />
      <div className={'paginator-numbers'}>
        {props.totalPages >= 5 ? (
          <>
            <span onClick={props.indexPageChange(1)} className={firstPagClass}>
              1
            </span>
            <div className={'current-center-numbers'}>
              <span
                className={activeFirstMiddleNumber}
                onClick={props.indexPageChange(middleNumber)}
              >
                {props.currentPage > 1 && props.currentPage < middleNumber
                  ? props.currentPage
                  : middleNumber}
              </span>
              <span
                className={activeSecondMiddleNumber}
                onClick={props.indexPageChange(middleNumber + 1)}
              >
                {props.currentPage > secondMiddleNumber && props.currentPage < props.totalPages
                  ? props.currentPage
                  : secondMiddleNumber}
              </span>
            </div>
            <span onClick={props.indexPageChange(props.totalPages)} className={lastPagClass}>
              {props.totalPages}
            </span>
          </>
        ) : (
          <span className={'paginator-numbers-first'}>{props.currentPage}</span>
        )}
      </div>
      <span onClick={props.nextPageChange} className={'paginator-right-arrow'} />
    </div>
  );
};

export default Paginator;
