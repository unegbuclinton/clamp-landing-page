import React from 'react'
import Link from 'next/link'

const SectionOne = () => {
  return (
    <div className="section pl-[112px] flex flex-col justify-center gap-10 border-r border-light-grey/90">
      <h1 className="w-[250px] text-[60px]">
        <span className="font-bold">RETAIN</span> YOUR <br /> CUSTOMERS
      </h1>
      <div className="text-dim-grey text-2xl max-w-[470px]">
        Increase customer loyalty with Clamp&apos;s API-driven loyalty software, delivering
        personalized offers for repeat purchases.
      </div>

      <div className="text-[17px] mt-20">
        <div className="flex w-fit text-white justify-center items-center py-3 px-6 rounded-lg bg-black cursor-pointer">
          Start here <p className="py-[2px] px-[6px] rounded text-silver bg-white/25 ml-2.5">A</p>
        </div>
        <p className="text-battle-grey mt-5 cursor-pointer">
          Got an account?{' '}
          <span className="text-black font-bold">
            <Link href="/signin">Login</Link>
          </span>
        </p>
      </div>
    </div>
  )
}

export default SectionOne
