import CustomerLoyaltyBoard from '@/components/molecules/CustomerLoyaltyBoard'
import NameLogo from '@/components/molecules/NameLogo/NameLogo'
import { getFirstLetters } from '@/utilities/helperFunctions'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import BanklyLogo from '@/assets/svgs/bankly.svg'
import React from 'react'

const LeaderBoard = () => {
  interface DataType {
    id: string
    participant: string
    points: string
    currentValue: string
    previousValue: string
    positionChange?: string
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'PARTICIPANTS',
      dataIndex: 'participant',
      key: 'participant',
      render: (text) => (
        <div className='flex gap-3 items-center'>
          <NameLogo name={text} />
          <div className='flex flex-col'>
            <p className='font-medium text-base'>{text}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'TRANSACTION VOLUME',
      dataIndex: 'points',
      key: 'points',
      render: (text) => <div className='text-center'>{text}</div>,
    },
  ]

  const data: DataType[] = [
    {
      id: '1',
      participant: 'Jachi Anikwe',
      points: '50',
      currentValue: '150',
      previousValue: '',
    },
    {
      id: '2',
      participant: 'Samuel Tally',
      currentValue: '150',
      previousValue: '',
      points: '10',
    },
    {
      id: '3',
      participant: 'Lucius Unegbu',
      currentValue: '150',
      previousValue: '',
      points: '25',
    },
    {
      id: '4',
      participant: 'Daniel Isreal',
      currentValue: '150',
      previousValue: '',
      points: '25',
    },
    {
      id: '5',
      participant: 'Jon Snow',
      currentValue: '150',
      previousValue: '',
      points: '100',
    },
  ]
  const label = getFirstLetters(data[0].participant)
  return (
    <div className='px-10 py-5'>
      <nav className=' flex justify-center w-full pb-24'>
        <BanklyLogo />
      </nav>

      {/* <div>
        <div className='w-[80px] h-[80px] rounded-full border mx-auto flex justify-center items-center text-2xl font-bold'>
          {label}
        </div>
      </div> */}
      {/* <h2 className='text-xl mb-4'>Week 1</h2> */}
      <div className='flex justify-center gap-10 w-full'>
        <CustomerLoyaltyBoard />
        <div className='w-full max-w-[600px]'>
          <h1 className='text-2xl font-bold mb-4'>
            Leader board{' '}
            <span className='font-normal text-base'> (Week 1)</span>
          </h1>
          <Table
            columns={columns}
            dataSource={data}
            className='max-w-[85%] pt-4'
          />
        </div>
      </div>
    </div>
  )
}
export default LeaderBoard
