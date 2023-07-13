import ButtonComponent from '@/components/atoms/button'
import emailjs from '@emailjs/browser'
import Modal from '../Modal'

interface getAccessProp {
  onClose: () => void
  thankYou: () => void
}
const GetAccessModalComponent: React.FC<getAccessProp> = ({
  onClose,
  thankYou,
}) => {
  const onFinish = (e: any) => {
    e.preventDefault()
    emailjs
      .sendForm(
        'service_1gof2mh',
        'template_4vel0c9',
        e.target,
        'ZG6_8nmE_wB-uc5O3'
      )
      .then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          console.log(error.text)
        }
      )

    e.target.reset()
    thankYou()
    onClose()
  }
  const fields: Array<{ type: string; label: string }> = [
    { type: 'from_name', label: 'Full name' },
    { type: 'message', label: 'Email' },
    { type: 'message', label: 'Phone number' },
    { type: 'message', label: 'Company name' },
    { type: 'message', label: 'Role' },
  ]
  return (
    <>
      <form onSubmit={onFinish}>
        {fields?.map(({ type, label }, idx) => (
          <div key={idx} className='pt-3'>
            <label className='dark:text-dark'>{label}</label>
            <input
              name={type}
              className='border rounded-lg dark:text-dark outline-none focus:border-black duration-200 px-3 py-2 mt-1 text-base w-full '
            />
          </div>
        ))}

        <div className='mt-5'>
          <ButtonComponent text='Get Access' type='submit' />
        </div>
      </form>
    </>
  )
}

export default GetAccessModalComponent
