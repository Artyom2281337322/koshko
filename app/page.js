'use client';

import { useState, useEffect } from 'react';
import ImageCard from '@/components/ImageCard';
import { getCategories, getImagesByCategory, getRandomImage } from '@/lib/nekosiaClient';

export default function Home() {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('neko');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [cats, imgs] = await Promise.all([
        getCategories(),
        getImagesByCategory('neko', 12)
      ]);
      setCategories(cats);
      setImages(imgs);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
    setLoading(false);
  };

  const handleCategoryChange = async (category) => {
    setLoading(true);
    setSelectedCategory(category);
    const imgs = await getImagesByCategory(category, 12);
    setImages(imgs);
    setLoading(false);
  };

  const handleRandom = async () => {
    setLoading(true);
    const randomImg = await getRandomImage();
    setImages([randomImg]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-pink-400">
              koshko
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRandom}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-pink-200 rounded-lg transition-colors text-sm font-medium border border-gray-700"
              >
                Случайное
              </button>
              <button
                onClick={loadData}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-all text-sm font-medium"
              >
                Обновить
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat.id || cat.name} 
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-md transition-all ${selectedCategory === cat.id
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
              <p className="text-gray-400">Загрузка...</p>
            </div>
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img) => (
              <div 
                key={img.id || img.url} 
                className="transition-transform hover:scale-[1.02]"
              >
                <ImageCard image={img} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <h3 className="text-lg font-medium mb-2 text-pink-200">Нет изображений</h3>
            <p>Попробуйте другую категорию</p>
          </div>
        )}
      </main>
    </div>
  );
}