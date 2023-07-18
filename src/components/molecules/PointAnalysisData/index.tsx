import React from 'react'

const ProgressAnalysisData = ({ percentage }: { percentage?: number }) => {
  return (
    <div>
      <p className='text-xl font-medium'>{`${percentage}K`}</p>
      <span className='text-battle-grey text-sm'>points left</span>
    </div>
  )
}

export default ProgressAnalysisData
