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
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
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

  const loadCategoryImages = async (category) => {
    setLoading(true);
    try {
      const imgs = await getImagesByCategory(category, 12);
      setImages(imgs);
    } catch (error) {
      console.error('Ошибка загрузки изображений:', error);
    }
    setLoading(false);
  };

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    await loadCategoryImages(category);
  };

  const handleRandom = async () => {
    setLoading(true);
    try {
      const randomImg = await getRandomImage(selectedCategory);
      setImages([randomImg]);
    } catch (error) {
      console.error('Ошибка загрузки случайного изображения:', error);
      await loadCategoryImages(selectedCategory);
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    await loadCategoryImages(selectedCategory);
  };

  return (
    <Layout>
      <Header 
        onRandom={handleRandom} 
        onRefresh={handleRefresh} 
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