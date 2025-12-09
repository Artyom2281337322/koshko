'use client';

export default function Header({ onRandom, onRefresh }) {
  return (
    <header className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-pink-400">
            koshko
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={onRandom}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-pink-200 rounded-lg transition-colors text-sm font-medium border border-gray-700"
            >
              Случайное
            </button>
            <button
              onClick={onRefresh}
              className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-all text-sm font-medium"
            >
              Обновить
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}