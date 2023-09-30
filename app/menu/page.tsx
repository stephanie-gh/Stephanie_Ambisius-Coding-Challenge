'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link'

export default function ProductList() {
  const [menu, setMenu] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const GetProducts = () => {
    useEffect(() => {
      const dataFromLocalStorage = localStorage.getItem('menus');

      // Check if data exists in localStorage
      if (dataFromLocalStorage) {
        const parsedData = JSON.parse(dataFromLocalStorage);
        setMenu(parsedData);
      }
    }, []);

    return menu;
  }

  const handleDelete = (index: number) => {
    setMenu(menu.filter((_, i) => i !== index));
    const storedArray = JSON.parse(localStorage.getItem('menus')) || [];
    for (const index in storedArray) {
      const indexToRemove = index;
      storedArray.splice(indexToRemove, 1);
    }
    localStorage.setItem('menus', JSON.stringify(storedArray))
  };

  const inputChange = (e) => {
    setInputValue(e.target.value);
    searchByName(inputValue)
  };

  const searchByName = (nameToSearch) => {
    const result = menu.find(item => item.name.toLowerCase().includes(nameToSearch.toLowerCase()));
    setMenu([result])
  }

  let products = GetProducts();
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md my-4 sm:rounded-lg w-[600px]">
        <div className="mx-4 my-4 bg-white flex flex-row justify-between">
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for menus.." value={inputValue} onChange={inputChange}></input>
          </div>
          <Link className="py-2.5 absolute right-0 flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mr-2 focus:outline-none" href="/menu/insert">Add New Menu
          </Link>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Menu
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.id}
                </td>
                <td className="px-6 py-4">
                  {item.name}
                </td>
                <td className="px-6 py-4">
                  IDR{item.price}
                </td>
                <td className="px-6 py-4 space-x-2">
                  <Link className="cursor-pointer font-medium text-blue-600 hover:underline" href={`/menu/edit/${index}`}>Edit
                  </Link>
                  <button className="cursor-pointer font-medium text-red-600 hover:underline" onClick={() => handleDelete(index)}>Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}