import Link from "next/link";
import React from "react";

export const Logo = () => {
  return (
    <div className='flex items-center space-x-2 font-bold text-lg'>
      <div className='flex items-center'>
        <Link href={"/home"}>
          <img src='/logo2.png' alt='Waivify Logo' className='w-10 h-10' />
        </Link>
        <Link href={"/home"}>Waivify</Link>
      </div>
    </div>
  );
};
