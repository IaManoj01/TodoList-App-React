import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-700 text-white py-2'>
      <div className="logo font-bold text-xl mx-9">
        iTask
      </div>
      <ul className="flex gap-5 list-none mx-9">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
