import Magnet from '@/assets/svgs/magnet.svg'
import Chart from '@/assets/svgs/sales-chart.svg'
import Engage from '@/assets/svgs/engagement.svg'
import Time from '@/assets/svgs/time.svg'

export const diagrams = [
  {
    img: <Magnet />,
    header: (
      <>
        <h2 className='text-2xl w-[200px] mb-4'>
          INCREASE CUSTOMER <span className='font-bold'>RETENTION</span>
        </h2>
      </>
    ),
    text: 'Keep customers coming back with a tailored loyalty program that rewards repeat purchases.',
    borderStyle: 'border-r border-b rounded-br-3xl',
  },
  {
    img: <Chart />,
    header: (
      <>
        <h2 className='text-2xl max-w-[250px] mb-4'>
          DRIVE REPEAT <span className='font-bold'>PURCHASE</span>
        </h2>
      </>
    ),
    text: 'Incentivize customers to buy more and spend more to earn exclusive rewards and benefits.',
    borderStyle: 'border-l border-b rounded-bl-3xl',
  },
  {
    img: <Engage />,
    header: (
      <>
        <h2 className='text-2xl w-[200px] mb-4'>
          <span className='font-bold'> ENGAGE</span> YOUR CUSTOMERS
        </h2>
      </>
    ),
    text: 'Create a community that makes customers feel valued through personalized challenges and promotions.',
    borderStyle: ' border-r border-t rounded-tr-3xl',
  },
  {
    img: <Time />,
    header: (
      <>
        <h2 className='text-2xl w-[200px] mb-4'>
          INCREASE <span className='font-bold'> LIFE TIME VALUE</span>
        </h2>
      </>
    ),
    text: 'Offer loyal customers progressively better rewards so they remain customers for life. customer retention.',
    borderStyle: 'border-l border-t rounded-tl-3xl',
  },
]
