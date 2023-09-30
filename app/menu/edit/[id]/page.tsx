'use client'
import { useEffect, useState } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';

export default function InsertMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [menu, setMenu] = useState({
    id: '',
    name: '',
    price: '',
  });

  function GetData() {
    useEffect(() => {
      const storedArray = JSON.parse(localStorage.getItem('menus')) || [];
      for (const index in storedArray) {
        if (index === pathname.split('/menu/edit/')[1]) {
          setMenu({
            ...menu,
            id: storedArray[storedArray.length - 1].id,
            name: storedArray[storedArray.length - 1].name,
            price: storedArray[storedArray.length - 1].price
          });
        }
      }
    }, []);
  }

  const inputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setMenu({
      ...menu,
      [name]: value,
    });
  };

  const InputSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const storedArray = JSON.parse(localStorage.getItem('menus')) || [];
    for (const index in storedArray) {
      if (index === pathname.split('/menu/edit/')[1]) {
        setMenu({
          ...menu,
          id: menu.id,
          name: menu.name,
          price: menu.price,
        });
        storedArray[index] = menu
      }
    }
    localStorage.setItem('menus', JSON.stringify(storedArray))
    router.push('/menu');
  };

  const data = GetData();
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md my-4 sm:rounded-lg w-[600px]">
        <div className="mx-4 mb-2 py-2 gap-y-4">
          <div className='flex justify-between mt-2 mb-6'>
            <div className="font-semibold text-xl pt-2">Update Menu</div>
            <Link className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700" href="/menu">Cancel</Link>
          </div>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
            <input type="text" id="name" name="name" value={menu.name} onChange={inputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "></input>
          </div>
          <div className="mb-6">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
            <input type="text" id="price" name="price" value={menu.price} onChange={inputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "></input>
          </div>
          <div className="flex justify-end">
            <button className="py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mr-2 focus:outline-none" onClick={InputSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}