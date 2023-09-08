import React from 'react'
import { Form, Input, Button } from 'antd'
import { useRouter } from 'next/router'
import ButtonComponent from '@/components/atoms/button'
import AuthLayout from '@/components/layouts/authLayout'

const ResetPassword = () => {
  const router = useRouter()
  return (
    <AuthLayout>
      <Form requiredMark='optional' className='max-w-[463px] pt-20'>
        <h1 className='text-2xl font-medium mb-2'>Reset your password?</h1>
        <p className='text-dim-grey mb-[44px]'>
          Make sure it is something you won’t forget.
        </p>
        <Form.Item
          className='mb-2 text-dim-grey'
          name='password'
          label='Password'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 4, message: 'Password must be at least 8 characters!' },
          ]}
        >
          <Input.Password className='py-2' />
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

export default ResetPassword
