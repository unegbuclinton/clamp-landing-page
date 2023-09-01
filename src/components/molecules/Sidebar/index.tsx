import React from 'react'
import SideBarItems from './SideBarItems'
import { useRouter } from 'next/navigation'
import ButtonComponent from '@/components/atoms/button'

const Sidebar = () => {
  const router = useRouter()
  return (
    <div className='relative h-full shadow-xl bg-white'>
      <div className=' max-w-2xl mx-auto hidden lg:block'>
        <aside className='w-64' aria-label='Sidebar'>
          <div className='px-3 py-4 overflow-y-auto rounded dark:bg-gray-800'>
            <SideBarItems />
            <ButtonComponent
              onClick={() => router.push('/campaignSelection')}
              text='Create Campaign'
              type='button'
              className='mt-10'
            />
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Sidebar
