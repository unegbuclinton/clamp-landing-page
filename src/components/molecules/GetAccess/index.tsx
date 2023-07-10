import ButtonComponent from '@/components/atoms/button'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'

interface getAccessProp {
  onClose: () => void
}
const GetAccessModalComponent: React.FC<getAccessProp> = ({ onClose }) => {
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
    onClose()
    toast.success(
      'Thank you for signing up! Early access to the software is guaranteed, and a teammate will contact you shortly.'
    )
  }
  const fields: Array<{ type: string; label: string }> = [
    { type: 'from_name', label: 'Name' },
    { type: 'message', label: 'Email' },
    { type: 'message', label: 'Role' },
  ]
  return (
    <form onSubmit={onFinish}>
      {fields?.map(({ type, label }, idx) => (
        <div key={idx} className='mb-4 py-5'>
          <label>{label}</label>
          <input
            name={type}
            className='border rounded-lg dark:text-dark outline-none focus:border-black duration-200 px-3 py-2 mt-1 text-base w-full '
          />
        </div>
      ))}

      <ButtonComponent text='Get Access' type='submit' />
    </form>
  )
}

export default GetAccessModalComponent
