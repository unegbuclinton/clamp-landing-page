import Link from 'next/link'
import React from 'react'

const PageNotFound = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
      <h1 className='text-4xl font-bold text-gray-800'>404 - Page Not Found</h1>
      <p className='text-lg text-gray-600 mt-4'>
        The page you're looking for doesn't exist.
      </p>
      <Link href='/overview' className='mt-6 text-blue-600 hover:underline'>
        Go back to the homepage
      </Link>
    </div>
  )
}

export default PageNotFound
