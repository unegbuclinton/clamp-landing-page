import DashboardLayout from '@/components/layouts/dashboardLayout'
import React from 'react'
import ArrowUp from '@/assets/svgs/arrow-up.svg'
import CustomerTable from '@/components/molecules/CustomerTable/CustomerTable'

const Customers = () => {
  const data = [
    {
      header: 'Total customers',
      value: '3,445',
      subText: '24 new customers in the last 7 days',
    },
    {
      header: 'Returning customers',
      value: '430',
      subText: '17% of total customers',
    },
  ]
  return (
    <DashboardLayout>
      <h1 className='font-bold mb-[38px] text-2xl'>Customers</h1>
      <div className='flex w-[85%] gap-[11px]'>
        {data?.map(({ header, value, subText }, idx) => (
          <div key={idx} className='w-full border p-4 rounded-xl'>
            <h3 className='mb-6'>{header}</h3>
            <p className='flex items-center text-2xl font-bold'>
              {value}
              <sup>
                <ArrowUp />
              </sup>
            </p>
            <p className='text-dim-grey pt-1'>{subText}</p>
          </div>
        ))}
      </div>
      <CustomerTable />
    </DashboardLayout>
  )
}

export default Customers
