"use client";

import React, { PropsWithChildren } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from './button';

const SubmitButton = ({children}:PropsWithChildren) => {
    const {pending} = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} className='w-full mt-2 bg-blue-700 text-white'>
       {pending?"submitting...":children}
    </Button>
  )
}

export default SubmitButton
