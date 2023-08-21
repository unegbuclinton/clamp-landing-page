import React from 'react'
import Logo from '@/assets/svgs/website-logo.svg'

const LoadingStateComponent = () => {
  return (
    <div>
      <div id='load' className='animate-pulse'>
        <Logo />
      </div>
    </div>
  )
}

export default LoadingStateComponent
