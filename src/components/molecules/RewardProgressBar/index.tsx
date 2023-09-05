import React from 'react'
import Gift from '@/assets/svgs/gift.svg'

const RewardProgressBar = () => {
  const numberOfDots = 6 // Define the number of dots you want
  const dots = []

  for (let i = 0; i < numberOfDots - 1; i++) {
    dots.push(
      <div key={i} className='dot'>
        <div className='h-[10px] w-[10px] bg-black rounded-full' />
      </div>
    )
  }

  // Add the last dot with the icon
  dots.push(
    <div key={numberOfDots - 1} className='dot'>
      <div className='h-fit w-fit bg-platimum rounded-full p-[6px]'>
        <Gift />
      </div>
    </div>
  )

  return (
    <div className='mb-4'>
      <div className='progress-bar'>
        {dots.map((dot, index) => (
          <React.Fragment key={index}>
            {dot}
            {index < numberOfDots - 1 && <div className='progress-line' />}
          </React.Fragment>
        ))}
      </div>
      <div className='flex justify-between text-platimum mt-1 text-xs'>
        <p>Start</p>
        <p>Unlock reward</p>
      </div>
    </div>
  )
}

export default RewardProgressBar
