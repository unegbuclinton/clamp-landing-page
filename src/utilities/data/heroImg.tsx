import engageCustomerImg from '@/assets/imgs/engage-customers.jpg'
import customer from '@/assets/imgs/customers.jpg'
import purchase from '@/assets/imgs/purchase.jpg'
import { StaticImageData } from 'next/image'

export const heroImg: Array<{
  url: string | StaticImageData
  title: string
  alt: string
}> = [
  {
    url: customer,
    title: 'Increase customer retention',
    alt: 'customer retention',
  },
  {
    url: purchase,
    title: 'Drive repeat purchases',
    alt: 'purchase',
  },
  {
    url: engageCustomerImg,
    title: 'Enagage your customers',
    alt: 'engagement',
  },
]
