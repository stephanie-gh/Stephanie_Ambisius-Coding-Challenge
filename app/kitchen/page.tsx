'use client'

import { useEffect, useState } from "react";

export default function Home() {
  const [order, setOrder] = useState([]);
  const [menu, setMenu] = useState([]);
  const [kitchenOrders, setKitchenOrders] = useState([]);

  const GetOrder = () => {
    useEffect(() => {
      const dataFromLocalStorage = localStorage.getItem('order');

      // Check if data exists in localStorage
      if (dataFromLocalStorage) {
        const parsedData = JSON.parse(dataFromLocalStorage);
        setOrder(parsedData);
      }
    }, []);

    return order;
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

  const KitchenOrders = () => {
    const orderArray = JSON.parse(localStorage.getItem('order'));
    const menuArray = JSON.parse(localStorage.getItem('menus'));
    useEffect(() => {
      const newKitchenOrders = orderArray.reduce((result, order) => {
        const tableNumber = order.table;

        if (!result[tableNumber]) {
          // Initialize an array for the table if it doesn't exist
          result[tableNumber] = [];
        }

        // Find the corresponding menu item based on menuId
        const menuItem = menuArray.find((menu) => menu.id === order.menuId);

        if (menuItem) {
          // Create a new order object with menu details
          const kitchenOrder = {
            orderId: order.id,
            menuName: menuItem.name,
            tableNumber: order.table,
            quantity: order.quantity,
            price: menuItem.price,
            total: (menuItem.price*order.quantity)
          };

          // Push the kitchen order to the table's array
          result[tableNumber].push(kitchenOrder);
        }
        return result;
      }, {})
      setKitchenOrders(newKitchenOrders);
    }, []);
    localStorage.setItem('receipt', JSON.stringify(kitchenOrders));
  }

  let products = GetProducts();
  let orders = GetOrder();
  let lists = KitchenOrders();

  return (
    <main>
      <div className="px-6 py-4 mt-4 border-solid border-2 border-gray-200 rounded-md min-h-[300px] max-w-[1100px]">
        <div className="grid gap-y-6">
          {Object.keys(kitchenOrders).map((tableNumber) => (
            <div key={tableNumber} className="border border-sky-300 px-4 py-4">
              <h2 className="mb-2 text-lg font-semibold text-gray-900">Table {tableNumber}</h2>
              <div className="max-w-md space-y-1 text-gray-500">
                {kitchenOrders[tableNumber].map((order) => (
                  <div key={order.orderId}>
                    <span className="font-bold">{order.quantity}x</span> {order.menuName}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main >
  )
}