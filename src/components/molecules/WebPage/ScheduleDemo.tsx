import ButtonComponent from '@/components/atoms/button'
import { Checkbox, Form, Input } from 'antd'
import DemoIcon from '@/assets/svgs/demoIcon.svg'
import React from 'react'
import Link from 'next/link'

const ScheduleDemo = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  // const formItems = [
  //   {
  //     name: 'firstName',
  //     placeholder: 'First name',
  //     message: 'Please input your username!',
  //   },
  //   {
  //     name: 'lastName',
  //     placeholder: 'Last name',
  //     message: 'Please input your username!',
  //   },
  //   {
  //     name: 'companyName',
  //     placeholder: 'Company name',
  //     message: 'Please input your username!',
  //   },
  //   {
  //     name: 'email',
  //     placeholder: 'Business email',
  //     message: 'Please input your username!',
  //   },
  //   {
  //     name: 'role',
  //     placeholder: 'Your role',
  //     message: 'Please input your username!',
  //   },
  // ]
  const links = [
    { text: 'Linkedin', url: 'https://www.linkedin.com/company/clamployalty/' },
    {
      text: 'Clamp Growth Podcast',
      url: 'https://podcasters.spotify.com/pod/show/obinna-unegbu4/episodes/Clamp-Growth-with-Usman-Amusat-e28r6i1',
    },
  ]
  return (
    <div className='section relative flex flex-col justify-center lg:pl-[112px] px-6 md:px-0 border-r border-light-grey/90'>
      <h2 className='text-[32px] mb-6'>
        {/* REQUEST A <span className='font-bold'>DEMO</span> */}
        <span className='font-bold'>Let's talk</span>
      </h2>

      <p className='text-2xl mb-7'>
        Take a decisive step towards keeping your customers engaged, fostering
        loyalty, and revenue growth.
      </p>
      <Link
        href='https://zcal.co/i/Yrxnhmav'
        className='flex w-fit text-white justify-center items-center py-[6px] px-[18px] rounded-lg bg-black cursor-pointer hover:bg-black/95'
      >
        <p className='flex items-center gap-[11px] text-[17px]'>
          Request demo
          <span>
            <DemoIcon />
          </span>
        </p>
      </Link>

      <ul className='absolute bottom-10 flex gap-5'>
        {links.map(({ text, url }, idx) => (
          <a
            href={url}
            key={idx}
            className='underline cursor-pointer mb-6 text-base'
          >
            {text}
          </a>
        ))}
      </ul>
      {/* <iframe
        src='https://nicelyformed.com/publications/822c8fc3-e1a1-40ec-b637-e33d89e1b24e'
        width='100%'
        height='500'
      ></iframe> */}
      {/* <Form
        name='demo'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete='off'
      >
        {formItems?.map(({ message, name, placeholder }, idx) => (
          <Form.Item
            key={idx}
            name={name}
            rules={[{ required: true, message: message }]}
          >
            <Input
              placeholder={placeholder}
              className='py-2.5 bg-[#F2F2F2] text-xl'
            />
          </Form.Item>
        ))}

        <Form.Item name='remember' valuePropName='checked'>
          <Checkbox>I agree to Clamp&apos;s Privacy Policy.</Checkbox>
        </Form.Item>

        <Form.Item>
          <ButtonComponent
            height='51px'
            type='submit'
            text={
              <p className='flex items-center gap-[11px] text-[17px]'>
                Request demo
                <span>
                  <DemoIcon />
                </span>
              </p>
            }
          />
        </Form.Item>
      </Form> */}
    </div>
  )
}

export default ScheduleDemo
