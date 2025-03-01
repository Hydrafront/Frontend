import React from 'react'
import ReactPagination, { ReactPaginateProps } from 'react-paginate'

interface PropsType extends ReactPaginateProps {
}

const Pagination: React.FC<PropsType> = props => {
  return (
    <ReactPagination
      className='flex'
      activeLinkClassName='bg-green-700'
      breakLabel='...'
      disabledLinkClassName='cursor-default opacity-75'
      nextLinkClassName='bg-borderColor text-center mx-1 rounded-[5px] py-[5px] px-4 cursor-pointer hover:opacity-75'
      previousLinkClassName='bg-borderColor text-center mx-1 rounded-[5px] py-[5px] px-4 cursor-pointer hover:opacity-75'
      pageLinkClassName='bg-borderColor text-center mx-1 rounded-[5px] py-[5px] w-auto px-3 cursor-pointer hover:opacity-75'
      nextLabel='Next'
      previousLabel='Prev'
      renderOnZeroPageCount={null}
      {...props}
    />
  )
}

export default Pagination
