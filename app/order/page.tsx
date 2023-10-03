'use client'

import { useEffect, useState } from "react";

export default function Home() {
  const [menu, setMenu] = useState([]);
  const [buttonValue, setButtonValue] = useState('');
  const [menuValue, setMenuValue] = useState('');
  const [quantityValue, setQuantityValue] = useState('');
  const [lastIndex, setLastIndex] = useState('');
  let order = []
  const [showNotification, setShowNotification] = useState(false);

  const hideNotification = () => {
    setShowNotification(false);
  };

  function GetLastId() {
    useEffect(() => {
      const storedArray = JSON.parse(localStorage.getItem('order')) || [];
      if (storedArray.length <= 0) {
        const firstIndex = 'B0000';
        setLastIndex(firstIndex);
      } else {
        const lastIndex = storedArray.length - 1;
        setLastIndex(storedArray[lastIndex].id);
      }
    }, []);
  }

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

  const handleTableButtonClick = (e) => {
    const { value } = e.target;
    setButtonValue(value);
  };

  const handleSelectMenu = (e) => {
    const { value } = e.target;
    setMenuValue(value);
  };

  const handleSelectQuantity = (e) => {
    const { value } = e.target;
    setQuantityValue(value);
  };

  function generateNextId(lastId: string) {
    const numericPart = parseInt(lastId.slice(1), 10);
    const nextNumericPart = numericPart + 1;
    const formattedId = "B" + String(nextNumericPart).padStart(4, "0");
    order.id = formattedId;
    return formattedId;
  }

  const InputSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    let lastInsertedId = lastIndex;
    const nextId = generateNextId(lastInsertedId);
    lastInsertedId = nextId;

    order = {
      id: nextId,
      table: buttonValue,
      menuId: menuValue,
      quantity: quantityValue,
    }

    const existingArray = JSON.parse(localStorage.getItem('order')) || [];
    existingArray.push(order);
    localStorage.setItem('order', JSON.stringify(existingArray));
    setLastIndex(order.id);

    setShowNotification(true);
  };

  let products = GetProducts();
  const last = GetLastId();
  return (
    <main>
      <div>
        {showNotification && (
          <div id="toast-success" className="fixed flex items-center w-full max-w-sm p-4 mb-4 text-gray-500 right-5 bottom-5 bg-white rounded-lg shadow" role="alert">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="sr-only">Check icon</span>
            </div>
            <div className="ml-3 text-sm font-normal">We have successfully placed the order.</div>
            <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" aria-label="Close" onClick={hideNotification}>
              <span className="sr-only">Close</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
        )}
        <div className="px-6 py-4 mt-4 border-solid border-2 border-gray-200 rounded-md min-h-[300px]">
          <div className="flex gap-x-6">
            <button value={1} className="bg-transparent focus:bg-blue-500 text-blue-700 font-semibold focus:text-white py-2 px-4 border border-blue-500 focus:border-transparent rounded w-32" onClick={handleTableButtonClick}>
              Table 1
            </button>
            <button value={2} className="bg-transparent focus:bg-blue-500 text-blue-700 font-semibold focus:text-white py-2 px-4 border border-blue-500 focus:border-transparent rounded w-32" onClick={handleTableButtonClick}>
              Table 2
            </button>
            <button value={3} className="bg-transparent focus:bg-blue-500 text-blue-700 font-semibold focus:text-white py-2 px-4 border border-blue-500 focus:border-transparent rounded w-32" onClick={handleTableButtonClick}>
              Table 3
            </button>
          </div>
          <div className="flex justify-between">
            <div className="pt-8 grid gap-4">
              <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Menu</div>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5" value={menuValue} onChange={handleSelectMenu}>
                <option value="">--Choose an item--</option>
                {products.map((item, index) => (
                  <option value={item.id} key={index}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="pt-8 grid gap-4">
              <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Jumlah</div>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5" value={quantityValue} onChange={handleSelectQuantity}>
                <option value="">--Choose quantity--</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-end pt-8">
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={InputSubmit}>
              Add Order
            </button>
          </div>
        </div>
      </div>
    </main >
  )
}