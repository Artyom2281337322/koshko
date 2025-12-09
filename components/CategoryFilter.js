'use client';

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id || cat.name}
            onClick={() => onCategoryChange(cat.id)}
            className={`px-4 py-2 rounded-md transition-all ${
              selectedCategory === cat.id
                ? 'bg-pink-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}