'use client';

import ImageCard from './ImageCard';

export default function ImageGrid({ images, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          <p className="text-gray-400">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <h3 className="text-lg font-medium mb-2 text-pink-200">Нет изображений</h3>
        <p>Попробуйте другую категорию или нажмите "Обновить"</p>
      </div>
    );
  }

  const isSingleRandomImage = images.length === 1;

  return (
    <div>
      <div className={`grid gap-4 ${
        isSingleRandomImage 
          ? 'grid-cols-1 max-w-2xl mx-auto' 
          : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      }`}>
        {images.map((img) => (
          <div 
            key={img.id || img.url}
            className={`transition-transform ${
              isSingleRandomImage 
                ? 'hover:scale-[1.01]' 
                : 'hover:scale-[1.02]'
            }`}
          >
            <ImageCard image={img} />
          </div>
        ))}
      </div>
    </div>
  );
}