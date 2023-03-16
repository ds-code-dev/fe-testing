import React, { useState } from "react";
import style from "./index.module.css";
import { FaChevronLeft, FaChevronRight, FaEllipsisH } from "react-icons/fa";

function Pagination({
  count,
  currentPage,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
}) {
  const [pagination_max, setPagination_max] = useState(2);
  const [pagination_max_current, setPagination_max_current] = useState(1);
  const per_page_list = [5, 10, 25, 50, 100];
  const [per_page, setPer_page] = useState(5);

  const handleFirstPageButtonClick = () => {
    onChangePage(1);
    setPagination_max_current(1);
  };

  const handleBackButtonClick = () => {
    onChangePage(currentPage - 1);
    let maxCurrent =
      currentPage - 1 < pagination_max_current
        ? currentPage - pagination_max
        : pagination_max_current;
    setPagination_max_current(maxCurrent);
  };

  const handleNextButtonClick = () => {
    onChangePage(currentPage + 1);
    let maxCurrent =
      currentPage + 1 >= pagination_max_current + pagination_max
        ? currentPage + 1
        : pagination_max_current;
    setPagination_max_current(maxCurrent);
  };

  const handleLastPageButtonClick = () => {
    const lastPage = Math.ceil(count / rowsPerPage);
    onChangePage(lastPage);
    let maxCurrent =
      Math.ceil(count / rowsPerPage) +
      1 -
      (Math.ceil(count / rowsPerPage) % pagination_max
        ? Math.ceil(count / rowsPerPage) % pagination_max
        : pagination_max);

    setPagination_max_current(maxCurrent);
  };

  const handleClickPagination = (val) => {
    onChangePage(val);
  };

  const handleNextPagination = () => {
    onChangePage(pagination_max_current + pagination_max);
    setPagination_max_current(pagination_max_current + pagination_max);
  };

  const handlePrevPagination = () => {
    onChangePage(pagination_max_current - pagination_max);
    setPagination_max_current(pagination_max_current - pagination_max);
  };

  const handleDisplayPageChange = (e) => {
    setPer_page(e);
    onChangeRowsPerPage(e);
  };

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.display_wrapper}>
          <label>Tampilkan</label>
          <select
            className={style.select}
            onChange={(e) => handleDisplayPageChange(e.target.value)}
            value={per_page}
          >
            {per_page_list.map((data, index) => (
              <option key={index} value={data}>
                {data}
              </option>
            ))}
          </select>
        </div>
        <div className={style.pagination_wrapper}>
          <span>
            Menampilkan {currentPage * rowsPerPage - rowsPerPage + 1} -{" "}
            {currentPage * rowsPerPage > count
              ? currentPage * rowsPerPage -
                count +
                (currentPage - 1) * rowsPerPage
              : currentPage * rowsPerPage}{" "}
            dari {count} baris
          </span>
          <div className={style.pagination}>
            <button
              className={style.btn_icon}
              onClick={handleFirstPageButtonClick}
              disabled={currentPage === 1 ? true : false}
            >
              <FaChevronLeft className={style.icon} />
            </button>
            <button
              className={style.btn_icon}
              onClick={handleBackButtonClick}
              disabled={currentPage === 1 ? true : false}
            >
              <FaChevronLeft className={style.icon} />
            </button>

            {currentPage > pagination_max && (
              <button className={style.btn_icon} onClick={handlePrevPagination}>
                <FaEllipsisH className={style.icon} />
              </button>
            )}

            {Array.from(
              {
                length:
                  Math.ceil(count / rowsPerPage) < pagination_max
                    ? Math.ceil(count / rowsPerPage)
                    : pagination_max,
              },
              (_, i) => i + pagination_max_current
            ).map((val, index) => {
              return (
                <button
                  key={index}
                  className={`${style.btn} ${
                    currentPage == val ? style.active : ""
                  }`}
                  onClick={() => handleClickPagination(val)}
                >
                  {val}
                </button>
              );
            })}

            {pagination_max_current <=
              Math.ceil(count / rowsPerPage) - pagination_max &&
              Math.ceil(count / rowsPerPage) > pagination_max && (
                <button
                  className={style.btn_icon}
                  onClick={handleNextPagination}
                >
                  <FaEllipsisH className={style.icon} />
                </button>
              )}

            <button
              className={style.btn_icon}
              onClick={handleNextButtonClick}
              disabled={
                currentPage === Math.ceil(count / rowsPerPage) ? true : false
              }
            >
              <FaChevronRight className={style.icon} />
            </button>

            <button
              className={style.btn_icon}
              onClick={handleLastPageButtonClick}
              disabled={
                currentPage === Math.ceil(count / rowsPerPage) ? true : false
              }
            >
              <FaChevronRight className={style.icon} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const CustomPagination = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage,
  currentPage,
}) => {
  console.log("berapa ini", rowsPerPage);
  return (
    <Pagination
      count={rowCount}
      rowsPerPage={rowsPerPage}
      currentPage={currentPage}
      onChangePage={onChangePage}
      onChangeRowsPerPage={(perPage) => onChangeRowsPerPage(perPage)}
    />
  );
};

export default CustomPagination;
