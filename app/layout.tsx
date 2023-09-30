'use client'

import { usePathname } from 'next/navigation'
import './globals.css'
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })
const pages = [
  {
    label: 'Menu',
    path: '/menu'
  },
  {
    label: 'Order',
    path: '/order'
  },
  {
    label: 'Kitchen',
    path: '/kitchen'
  },
  {
    label: 'Cashier',
    path: '/cashier'
  }
]

const GetBaseMenu = () => {
  const checkData = localStorage.getItem('menus');

  useEffect(() => {
    const menus = [
      {
        id: 'M0001',
        name: 'Traditional Indonesian Fried Rice',
        price: '25000'
      },
      {
        id: 'M0002',
        name: 'Betutu Chicken with Rice',
        price: '55000'
      }
    ]

    const dataFromLocalStorage = checkData;

    if (!dataFromLocalStorage) {
      localStorage.setItem('menus', JSON.stringify(menus))
    }
  }, []);
}

const onReset = () => {
  const menus = [
    {
      id: 'M0001',
      name: 'Traditional Indonesian Fried Rice',
      price: '25000'
    },
    {
      id: 'M0002',
      name: 'Betutu Chicken with Rice',
      price: '55000'
    }
  ]

  localStorage.setItem('menus', JSON.stringify(menus))
  window.location.reload()
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const baseMenu = GetBaseMenu()

  return (
    <html lang="en">
      <div className='grid place-content-center'>
        <div className='text-2xl mt-4'>Ambisius Kitchen</div>
        <div className='text-sm mt-2 mb-4'>Made by Stephanie</div>
        <div className='flex justify-between'>
          <ul className="flex">
            <li className="-mb-px mr-1">
              {pages.map((item, index) => (
                <Link className={`${pathname === item.path ? 'bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold' : 'bg-white inline-block border-b py-2 px-4 text-gray-400 font-semibold'}`} href={item.path} key={index}>{item.label}</Link>
              ))}
            </li>
          </ul>
          <button type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700" onClick={onReset}>Reset</button>
        </div>
        <div className={inter.className}>{children}</div>
      </div>
    </html>
  )
}
