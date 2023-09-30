'use client'

export default function Home() {
  const menus = [
    {
      id: 'M0001',
      name: 'Traditional Indonesian Fried Rice',
      price: '25.000'
    },
    {
      id: 'M0002',
      name: 'Betutu Chicken with Rice',
      price: '55.000'
    }
  ]

  return (
    <main>
      <div className="px-6 py-4 mt-4 border-solid border-2 border-gray-200 rounded-md min-h-[300px]">
        <div className="flex gap-x-6">
          <button className="bg-transparent focus:bg-blue-500 text-blue-700 font-semibold focus:text-white py-2 px-4 border border-blue-500 focus:border-transparent rounded w-32">
            Table 1
          </button>
          <button className="bg-transparent focus:bg-blue-500 text-blue-700 font-semibold focus:text-white py-2 px-4 border border-blue-500 focus:border-transparent rounded w-32">
            Table 2
          </button>
          <button className="bg-transparent focus:bg-blue-500 text-blue-700 font-semibold focus:text-white py-2 px-4 border border-blue-500 focus:border-transparent rounded w-32">
            Table 3
          </button>
        </div>
        <div className="flex justify-between">
          <div className="pt-8 grid gap-4">
            <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Menu</div>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5">
              {menus.map((item, index) => (
                <option value={item.id} key={index}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="pt-8 grid gap-4">
            <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Jumlah</div>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row justify-end pt-8">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Add Order
          </button>
        </div>
      </div>
    </main >
  )
}