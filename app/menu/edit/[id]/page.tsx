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
  const [showNotification, setShowNotification] = useState(false);

  const hideNotification = () => {
    setShowNotification(false);
  };

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

    setShowNotification(true);

    router.push('/menu');
  };

  const data = GetData();
  return (
    <div>
      {showNotification && (
        <div id="toast-success" className="fixed flex items-center w-full max-w-sm p-4 mb-4 text-gray-500 right-5 bottom-5 bg-white rounded-lg shadow" role="alert">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ml-3 text-sm font-normal">The menu has been successfully updated.</div>
          <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" aria-label="Close" onClick={hideNotification}>
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
      )}
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