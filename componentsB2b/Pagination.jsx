import { MdKeyboardArrowRight, MdKeyboardArrowLeft, MdFastForward, MdFastRewind } from 'react-icons/md';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pagesToShow = 6; // Number of page toggle buttons to display

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      <button
        className={`h-8 w-8 flex justify-center items-center rounded-full ${
          currentPage === 1 ? 'bg-light300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'
        }`}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <MdFastRewind size={20} />
      </button>

      <button
        className={`h-8 w-8 flex justify-center items-center rounded-full ${
          currentPage === 1 ? 'bg-light300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdKeyboardArrowLeft size={20} />
      </button>

      {getPageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          className={`h-8 w-8 flex justify-center items-center rounded-full  ${
            pageNum === currentPage ? 'bg-blue-500 text-white' : ' hover:bg-blue-500 hover:text-white'
          }`}
          onClick={() => onPageChange(pageNum)}
        >
          <p>{pageNum}</p>
        </button>
      ))}

      <button
        className={`h-8 w-8 flex justify-center items-center rounded-full ${
          currentPage === totalPages ? 'bg-light300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <MdKeyboardArrowRight size={20} />
      </button>

      <button
        className={`h-8 w-8 flex justify-center items-center rounded-full ${
          currentPage === totalPages ? 'bg-light300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'
        }`}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <MdFastForward size={20} />
      </button>
    </div>
  );
};

export default Pagination;
