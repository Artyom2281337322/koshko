'use client';

export default function ImageCard({ image }) {
  if (!image) return null;

  return (
    <div className="group relative overflow-hidden rounded-xl bg-gray-800 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-[1.02]">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image.url}
          alt={image.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://placewaifu.com/image/400/300?text=${image.title}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{image.title}</h3>
        <div className="flex flex-wrap gap-2 mt-3">
          {image.tags && image.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-purple-900/50 text-purple-200 text-sm rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}