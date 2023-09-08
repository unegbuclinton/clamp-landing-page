import React from 'react'
import { Form, Input, Button } from 'antd'
import { useRouter } from 'next/router'
import ButtonComponent from '@/components/atoms/button'
import AuthLayout from '@/components/layouts/authLayout'

const ForgotPassword = () => {
  const router = useRouter()
  return (
    <AuthLayout>
      <Form requiredMark='optional' className='max-w-[463px] pt-20'>
        <h1 className='text-2xl font-medium mb-2'>Forgot your password?</h1>
        <p className='text-dim-grey mb-[44px]'>
          Enter the email address associated with your account and we’ll send
          you a link to reset your password.
        </p>
        <Form.Item
          className='mb-2 text-dim-grey'
          name='email'
          label='Email Address'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[
            { required: true, message: 'Please input your Email!' },
            { min: 4, message: 'Username must be at least 4 characters!' },
          ]}
        >
          <Input className='py-2' />
        </Form.Item>

        <ButtonComponent
          type='submit'
          className='w-full mt-6'
          text='Send reset link'
        />
      </Form>

      <span
        onClick={() => router.push('/signin')}
        className='font-semibold hover:underline cursor-pointer'
      >
        Return to log in
      </span>
    </AuthLayout>
  )
}

export default ForgotPassword
