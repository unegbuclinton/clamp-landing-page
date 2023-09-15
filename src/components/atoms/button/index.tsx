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
      style={{ height: height ? height : '43px' }}
      className={`${className} w-fit rounded-[8px] px-7  text-sm ${
        outline
          ? ' outline-button-override bg-white text-black hover:text-black'
          : 'bg-black text-white'
      } button-override`}
    >
      {text}
    </Button>
  )
}

export default ButtonComponent
