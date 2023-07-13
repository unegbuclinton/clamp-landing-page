import ButtonComponent from '@/components/atoms/button'

interface footerProp {
  onClick: () => void
}
const Footer: React.FC<footerProp> = ({ onClick }) => {
  return (
    <div className='bg-dark dark:bg-white '>
      <div className=' flex flex-col items-center justify-center p-10 mt-20 lg:mt-0 '>
        <div className='flex justify-between mb-5'>
          <h2 className=' text-xl text-white font-bold dark:text-dark'>
            Clamp
          </h2>
          <ul>
            <li className='rounded-[5px] cursor-pointer bg-grey/20'></li>
            <li></li>
          </ul>
        </div>
        <p className='max-w-[475px] mb-[40px] text-base text-center text-white dark:text-dark'>
          Let our API - based loyalty software help you reward loyal customers
          and get repeat sales from customers you have acquired
        </p>
        <ButtonComponent type='button' text='Talk to us' onClick={onClick} />
      </div>
      <p className='text-grey text-center'>© 2023</p>
    </div>
  )
}

export default Footer
