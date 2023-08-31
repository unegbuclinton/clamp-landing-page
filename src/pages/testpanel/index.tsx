import React from 'react'
import { Form, Input, Button } from 'antd'
import { useRouter } from 'next/router'
import ButtonComponent from '@/components/atoms/button'
import AuthLayout from '@/components/layouts/authLayout'

const TestPanel = () => {
  const router = useRouter()
  return (
    <AuthLayout>
      <div className="flex flex-col justify-center pt-12 w-full">
        <h2 className="text-2xl font-bold w-full">Test Panel</h2>
      </div>
    </AuthLayout>
  )
}

export default TestPanel
