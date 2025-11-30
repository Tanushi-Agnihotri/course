import Link from 'next/link'
import React from 'react'
import AuthButton from './AuthButton'
import SubmitButton from './submitButton'

const appBar = () => {
  return (
    <div className='p-2 shadow flex gap-6 bg-gradient-to-br from-blue-400 to-cyan-400 text-white items-center'>
      <Link href='/'>Home</Link>
      <Link href='/courses'>Courses</Link>
      {/* <Link href="/admin/courses/create" className="text-sm hover:underline">
        Create Course
      </Link> */}
      <div className="ml-auto">
        <AuthButton />
      </div>
    </div>
  )
}

export default appBar
