import { Reorder } from 'framer-motion'
import { useEffect, useState } from 'react'
import { GrDrag } from 'react-icons/gr'
import InvoicesHeader from '../components/InvoicesHeader'
import Status from '../components/Status'
import { invoices } from '../utils/mockInvoices'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { SignOutButton } from '@clerk/clerk-react'
import { useGetInvoicesQuery } from '../features/invoicesApi/invoicesApi.js'

const Invoices = () => {
  const { data } = useGetInvoicesQuery()
  console.log(data)
  const [items, setItems] = useState(invoices)
  // setting dragListener to true for mobile
  const [isDragging, setIsDragging] = useState(false)
  const { width } = useWindowDimensions()

  useEffect(() => {
    // let the user drag when they are on pc
    if (width > 768) setIsDragging(true)
  }, [width])

  const handleReorder = (reorderedIds) => {
    const reorderedInvoices = reorderedIds.map((id) =>
      items.find((invoice) => invoice.id === id)
    )
    setItems(reorderedInvoices)
  }

  return (
    // invoice parent
    <main className='min-[425px]:w-96 min-[425px]:ml-5 sm:w-[40rem] sm:ml-24 lg:w-fit lg:ml-52 xl:m-auto xl:px-20 pb-12'>
      <InvoicesHeader />
      <Reorder.Group
        axis='y'
        values={items.map((item) => item.id)}
        onReorder={handleReorder}
      >
        {items.map((invoice) => {
          const { id, amount, due, name, status } = invoice
          return (
            // invoice items
            <Reorder.Item
              className='grid grid-cols-2 mx-4 xl:ml-12 mt-4 bg-[#3b82f6] md:ml-10 lg:ml-5 p-4 rounded-lg shadow-lg items-center'
              key={id}
              dragListener={isDragging}
              onDragStart={() => width < 768 && setIsDragging(true)}
              onDragEnd={() => width < 768 && setIsDragging(false)}
              value={id}
            >
              <div className='space-y-2 sm:grid sm:grid-cols-3 items-center'>
                <div>
                  <span className='text-gray-200'># </span>
                  <span className='font-bold'>{id}</span>
                </div>
                <p className='lg:col-span-1 text-xs'>Due {due}</p>
                <p className='block sm:hidden font-semibold'>$ {amount}</p>
                <p className='text-sm lg:text-base hidden sm:block text-end font-semibold'>
                  {name}
                </p>
              </div>
              <div className='relative flex flex-col gap-4 sm:gap-0 sm:grid grid-cols-2 sm:items-center'>
                <div className='flex sm:hidden justify-end gap-4 items-center'>
                  <p className='text-sm lg:text-base  text-end font-semibold'>
                    {name}{' '}
                  </p>
                  <span
                    onTouchStart={() => setIsDragging(true)}
                    style={{ touchAction: 'none' }}
                  >
                    <GrDrag />
                  </span>
                </div>

                <p className='hidden sm:block text-center font-semibold'>
                  $ {amount}
                </p>
                <span
                  onTouchStart={() => setIsDragging(true)}
                  style={{ touchAction: 'none' }}
                  className='absolute right-[150px] lg:right-[170px] hidden sm:block cursor-grab'
                >
                  <GrDrag />
                </span>
                <Status place='component' status={status} />
              </div>
            </Reorder.Item>
          )
        })}
      </Reorder.Group>
    </main>
  )
}
export default Invoices
