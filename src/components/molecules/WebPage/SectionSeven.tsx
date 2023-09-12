import ButtonComponent from '@/components/atoms/button'
import { Checkbox, Form, Input } from 'antd'
import DemoIcon from '@/assets/svgs/demoIcon.svg'
import React from 'react'

const SectionSeven = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const formItems = [
    {
      name: 'firstName',
      placeholder: 'First name',
      message: 'Please input your username!',
    },
    {
      name: 'lastName',
      placeholder: 'Last name',
      message: 'Please input your username!',
    },
    {
      name: 'companyName',
      placeholder: 'Company name',
      message: 'Please input your username!',
    },
    {
      name: 'email',
      placeholder: 'Business email',
      message: 'Please input your username!',
    },
    {
      name: 'role',
      placeholder: 'Your role',
      message: 'Please input your username!',
    },
  ]

  return (
    <div className='section flex flex-col justify-center pl-[112px] border-r border-light-grey/90'>
      <h2 className='text-[32px] mb-6'>
        REQUEST A <span className='font-bold'>DEMO</span>
      </h2>
      <p className='text-2xl mb-7'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut accusamus
        ullam rem voluptates, laboriosam voluptas ipsam necessitatibus
        repudiandae! Voluptatibus, temporibus?
      </p>
      <Form
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
      </Form>
    </div>
  )
}

export default SectionSeven
