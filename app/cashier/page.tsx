'use client'

export default function Home() {

  return (
    <main>
      <div className="px-6 py-4 mt-4 border-solid border-2 border-gray-200 rounded-md min-h-[300px]">
        <div className="flex gap-x-6">
          <div className="grid gap-4">
            <div className="font-semibold">Payment</div>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5">
              <option value="1">Table 1</option>
              <option value="2">Table 2</option>
              <option value="3">Table 3</option>
            </select>
          </div>
          <div className="grid gap-4">
            <div></div>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-4 border border-blue-500 hover:border-transparent rounded w-36">
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </main >
  )
}