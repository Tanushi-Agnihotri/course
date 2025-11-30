"use client";

import React, { PropsWithChildren } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from './button';

interface SubmitButtonProps extends PropsWithChildren {
  disabled?: boolean;
}

const SubmitButton = ({ children, disabled }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const isPending = pending || disabled;
  return (
    <Button type="submit" aria-disabled={isPending} disabled={isPending} className=' w-75 mt-2 bg-blue-700 text-white'>
      {isPending ? "submitting..." : children}
    </Button>
  )
}

export default SubmitButton
