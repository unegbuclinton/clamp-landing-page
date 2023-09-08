import React from 'react'
import { authLayoutProps } from './types'
import ClampLogo from '@/components/molecules/ClampLogo/ClampLogo'

const AuthLayout: React.FC<authLayoutProps> = ({ children }) => {
  return (
    <div className='relative py-4 px-8 text-sm'>
      <header className='fixed  top-0 w-full font-medium bg-white/90 z-10 py-4'>
        <ClampLogo />
      </header>
      <div className='flex flex-col gap-5 justify-center items-center'>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
