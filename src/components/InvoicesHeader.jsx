import { MdAddCircle } from 'react-icons/md'
import { invoices } from '../utils/mockInvoices'
import { useDispatch } from 'react-redux'
import { open } from '../features/sidebar/sidebarSlice'

const InvoicesHeader = () => {
  const dispatch = useDispatch()
  return (
    <div className='flex gap-4 mt-4 mx-4 justify-between md:ml-10 lg:ml-5 xl:ml-12'>
      <div className='flex flex-col items-start'>
        <h1 className='text-center font-semibold text-xl'>Invoices</h1>
        <p className='block sm:hidden'>{invoices.length} invoices</p>
        <p className='hidden sm:block'>
          There are {invoices.length} total invoices
        </p>
      </div>

      <div className='flex gap-6'>
        <select
          className='select select-bordered w-full max-w-xs'
          name='status'
        >
          <option value=''>Filter By Status</option>
          <option value='draft'>Draft</option>
          <option value='draft'>Pending</option>
          <option value='draft'>Paid</option>
        </select>
        {/* add new invoice */}
        <button
          onClick={() => dispatch(open())}
          className='btn rounded-full bg-purple-600 text-white hover:bg-purple-800'
        >
          <span className='border border-white rounded-full p-1 text-lg'>
            <MdAddCircle />
          </span>
          New<span className='hidden sm:block'>Invoice</span>
        </button>
      </div>
    </div>
  )
}
export default InvoicesHeader
