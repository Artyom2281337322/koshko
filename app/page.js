'use client';

import { useState, useEffect } from 'react';
import { getCategories, getImagesByCategory, getRandomImage } from '@/lib/nekosiaClient';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import ImageGrid from '@/components/ImageGrid';

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
    <Layout>
      <Header 
        onRandom={handleRandom} 
        onRefresh={loadData} 
      />
      
      <main className="container mx-auto px-4 py-6">
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        <ImageGrid 
          images={images}
          loading={loading}
        />
      </main>
    </Layout>
  );
}