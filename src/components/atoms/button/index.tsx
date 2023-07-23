import React from 'react'
import { Button } from 'antd'
import { ButtonProps } from './types'

const ButtonComponent: React.FC<ButtonProps> = ({
  outline,
  text,
  disabled,
  height,
  type,
  className,
  loading,
  onClick,
}) => {
  return (
    <Button
      htmlType={type}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      className={`${className} rounded-[8px] hover:scale-90 duration-200 px-7 ${
        height ? height : 'h-[43px]'
      } text-sm ${outline ? 'bg-white text-black' : 'bg-black text-white'}`}
    >
      {text}
    </Button>
  )
}

export default ButtonComponent
