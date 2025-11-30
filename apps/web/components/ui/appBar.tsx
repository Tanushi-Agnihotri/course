import Link from 'next/link'
import React from 'react'
import AuthButton from './AuthButton'

const appBar = () => {
  return (
    <div className='p-2 shadow flex gap-3 bg-gradient-to-br from-blue-400 to-cyan-400 text-white items-center'>
      <Link href='/'>Home</Link>
      <div className="ml-auto">
        <AuthButton />
      </div>
    </div>
  )
}

export default appBar
