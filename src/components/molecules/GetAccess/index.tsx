import ButtonComponent from '@/components/atoms/button'
import { Form, Input } from 'antd'
import React from 'react'

const GetAccessModalComponent = () => {
  const onFinish = (values: any) => {
    console.log(values)
  }
  return (
    <Form onFinish={onFinish} requiredMark='optional'>
      <Form.Item
        name='name'
        label='Your Name'
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='email'
        label='Your Email'
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='role'
        label='Your Company role'
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[
          { required: true, message: 'Please input your role in your company' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='phone'
        label='Phone number'
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rules={[{ required: true, message: 'Please input your phone!' }]}
      >
        <Input />
      </Form.Item>
      <ButtonComponent text='Get Access' type='submit' />
    </Form>
  )
}

export default GetAccessModalComponent
