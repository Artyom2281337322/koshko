import axios from 'axios';

const API_BASE_URL = 'https://nekos.best/api/v2';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

export const getCategories = async () => {
  return [
    { id: 'neko', name: 'Кошки' },
    { id: 'waifu', name: 'Девушки' },
    { id: 'husbando', name: 'Парни' },
    { id: 'kitsune', name: 'Лисы' },
  ];
};

export const getImagesByCategory = async (category = 'neko', amount = 12) => {
  try {
    console.log('Запрашиваем категорию:', category);
    const response = await api.get(`/${category}?amount=${amount}`);
    return response.data.results || [];
  } catch (error) {
    console.error('Ошибка API:', error.message);
    return generateFallbackImages(category, amount);
  }
};

export const getRandomImage = async (category = 'neko') => {
  try {
    const response = await api.get(`/${category}?amount=1`);
    return response.data.results[0] || generateFallbackImages(category, 1)[0];
  } catch (error) {
    console.error('Ошибка получения случайного изображения:', error.message);
    return generateFallbackImages(category, 1)[0];
  }
};

const generateFallbackImages = (category, amount) => {
  const images = [];
  for (let i = 1; i <= amount; i++) {
    images.push({
      id: `${category}_${i}`,
      url: `https://placewaifu.com/image/400/300?cat=${category}&id=${i}`,
      title: `${category} изображение ${i}`,
      tags: [category, 'anime'],
      category: category,
    });
  }
  return images;
};

export const searchImages = async (query) => {
  const allCategories = ['neko', 'waifu', 'husbando', 'kitsune'];
  const allImages = [];
  
  for (const category of allCategories) {
    const images = await getImagesByCategory(category, 6);
    allImages.push(...images);
  }
  
  return allImages.filter(img => 
    img.title.toLowerCase().includes(query.toLowerCase()) ||
    img.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
};