import { Button, Progress, Typography } from 'antd'
import React from 'react'
import ProgressAnalysisData from '../PointAnalysisData'

const PointAnalysisCard = () => {
  return (
    <div className='w-full border p-4 rounded-xl'>
      <div className='flex flex-col'>
        <div className='flex gap-[47px]'>
          <Progress
            type='circle'
            format={(percent) => <ProgressAnalysisData percentage={percent} />} // Custom format to display "75k" instead of "75%"
            percent={75}
            strokeWidth={5}
            strokeColor={{
              '0%': '#000',
              '100%': '#000',
            }}
          />
          <div className='text-sm'>
            <p className='font-medium text-dim-grey mb-1'>USED</p>
            <p style={{ font: 'medium', marginBottom: '1.5' }}>28</p>
            <p className='font-thin text-battle-grey mb-1'>N451,936</p>

            <p className='font-medium text-dim-grey mb-1'>REDEEMED</p>
            <p className='font-medium mb-1'>92</p>
            <p className='font-thin text-battle-grey mb-0'>N230,936</p>
          </div>
        </div>
        <Button htmlType='button' className='w-fit'>
          Top up points
        </Button>
      </div>
    </div>
  )
}

export default PointAnalysisCard
