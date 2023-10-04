'use client'

import { useState } from "react";

export default function Home() {
  const [order, setOrder] = useState([]);
  const [buttonValue, setButtonValue] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [totalPayment, setTotalPayment] = useState('');
  let total = 0;
  const [showNotification, setShowNotification] = useState(false);


  const hideNotification = () => {
    setShowNotification(false);
  };

  const handleTableButtonClick = (e) => {
    const { value } = e.target;
    setButtonValue(value);
    setShowNotification(false);
  };

  const printInvoice = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const dataFromLocalStorage = localStorage.getItem('receipt');

    // Check if data exists in localStorage
    if (dataFromLocalStorage) {
      const parsedData = JSON.parse(dataFromLocalStorage);

      for (const index in parsedData) {
        if (index === buttonValue) {
          const data = parsedData[index];
          for (const cIndex in data) {
            total += parsedData[index][cIndex].total;
          }
          setOrder(data);
          setSelectedTable(index);
          setTotalPayment(total);
          setShowNotification(true);
        } else {
          setOrder([]);
          setSelectedTable('');
          setTotalPayment(0);
        }
      }
    }
    return order;
  };

  const emptyTable = (index: string) => {
    const dataFromLocalStorage = localStorage.getItem('order');

    // Check if data exists in localStorage
    if (dataFromLocalStorage) {
      const parsedData = JSON.parse(dataFromLocalStorage);

      const result = parsedData.filter(item => item.table !== index);
      localStorage.setItem('order', JSON.stringify(result));

      const receipt = JSON.parse(localStorage.getItem('receipt'));
      delete receipt[index];
      localStorage.setItem('receipt', JSON.stringify(receipt));
      setOrder([]);
      setTotalPayment(0);
    }
    return order;
  }

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
            <div className="ml-3 text-sm font-normal">Payment success! Thankyou for coming✨</div>
            <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" aria-label="Close" onClick={hideNotification}>
              <span className="sr-only">Close</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
        )}
        <div className="px-6 py-4 mt-4 border-solid border-2 border-gray-200 rounded-md min-h-[300px] min-w-[700px]">
          <div className="flex gap-x-6">
            <div className="grid gap-4">
              <div className="font-semibold">Payment</div>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5" value={buttonValue} onChange={handleTableButtonClick}>
                <option value="">--Select Table--</option>
                <option value={1}>Table 1</option>
                <option value={2}>Table 2</option>
                <option value={3}>Table 3</option>
              </select>
            </div>
            <div className="grid gap-4">
              <div></div>
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-4 border border-blue-500 hover:border-transparent rounded w-36" onClick={printInvoice}>
                Print Invoice
              </button>
            </div>
            {
              buttonValue !== "" &&
              <div className="grid gap-4">
                <div></div>
                <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-4 border border-red-500 hover:border-transparent rounded w-36" onClick={() => emptyTable(buttonValue)}>
                  Empty Table
                </button>
              </div>
            }
          </div>
          <div className="mt-4">
            <div className="font-semibold pb-2">Table {selectedTable} Order:</div>
            <ul className="space-y-2 text-gray-500 list-inside">
              {Object.keys(order).map((tableNumber) => (
                <li key={tableNumber} className="list-disc">
                  ({order[tableNumber].quantity}) {order[tableNumber].menuName} x IDR{order[tableNumber].price} = <span className="font-bold">IDR{order[tableNumber].total}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-right mt-4">Total to Pay is <span className="font-bold">IDR{totalPayment}</span></div>
        </div>
      </div>
    </main >
  )
}