'use client'

export default function Home() {

  return (
    <main>
      <div className="px-6 py-4 mt-4 border-solid border-2 border-gray-200 rounded-md min-h-[300px]">
        <div className="flex gap-x-6">
          <div className="grid gap-4">
            <div className="font-semibold text-xl">Meja 1</div>
            <ul className="list-disc list-inside px-2 rounded bg-gray-200 space-y-2">
              <li>Traditional Fried Rice</li>
            </ul>
          </div>
          <div className="grid gap-4">
            <div className="font-semibold text-xl">Meja 2</div>
            <ul className="list-disc list-inside px-2 rounded bg-gray-200 space-y-2">
              <li>Traditional Fried Rice</li>
            </ul>
          </div>
          <div className="grid gap-4">
            <div className="font-semibold text-xl">Meja 3</div>
            <ul className="list-disc list-inside px-2 rounded bg-gray-200 space-y-2">
              <li>Traditional Fried Rice</li>
            </ul>
          </div>
        </div>
      </div>
    </main >
  )
}