'use client';

export default function ImageCard({ image }) {
  if (!image) return null;

  return (
    <div className="group overflow-hidden rounded-lg bg-gray-800 border border-gray-700 hover:border-pink-500 transition-all duration-300 hover:scale-[1.02]">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image.url}
          alt={image.title}
          className="w-full h-[500px] group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://placewaifu.com/image/400/400?text=${image.title || 'Neko'}`;
          }}
        />
      </div>
    </div>
  );
}