'use client';

import { useState, useEffect } from 'react';
import ImageCard from '@/components/ImageCard';
import { getCategories, getImagesByCategory, getRandomImage, searchImages } from '@/lib/nekosiaClient';

export default function Home() {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('neko');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Загрузка данных
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
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (category) => {
    setLoading(true);
    setSelectedCategory(category);
    try {
      const imgs = await getImagesByCategory(category, 12);
      setImages(imgs);
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = async () => {
    setLoading(true);
    try {
      const randomImg = await getRandomImage();
      setImages([randomImg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      await handleCategoryChange(selectedCategory);
      return;
    }
    
    setLoading(true);
    try {
      const results = await searchImages(searchQuery);
      setImages(results.slice(0, 12));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Шапка */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Nekosia Gallery
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Категории */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 mb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-5 py-2 rounded-lg transition-colors ${
                  selectedCategory === cat.id 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={handleRandom}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
               Случайное
            </button>
            <button
              onClick={loadData}
              className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
               Обновить все
            </button>
          </div>
        </div>

        {/* Сетка изображений */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((img) => (
              <ImageCard key={img.id} image={img} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <div className="text-6xl mb-4">😿</div>
            <h3 className="text-xl font-semibold mb-2">Нет изображений</h3>
            <p>Выберите другую категорию</p>
          </div>
        )}
      </main>

      <footer className="mt-12 py-6 border-t border-gray-800 text-center text-gray-500">
        <p>Проект с API • {new Date().getFullYear()}</p>
        <p className="text-sm mt-1">Все изображения загружаются через API</p>
      </footer>
    </div>
  );
}