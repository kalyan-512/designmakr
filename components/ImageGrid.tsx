import Image from "next/image";
import type { GeneratedImage } from "@/types";

interface Props {
  images: GeneratedImage[];
}

export default function ImageGrid({ images }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((img) => (
        <div key={img.id} className="group overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <Image 
              src={img.url} 
              alt={img.prompt} 
              fill 
              className="object-cover transition-transform duration-300 group-hover:scale-110" 
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-5 space-y-3">
            <p className="font-semibold text-gray-900 line-clamp-2 text-sm">{img.prompt}</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium border border-purple-200">
                {img.designType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium border border-blue-200">
                Age {img.ageGroup}
              </span>
              <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-medium border border-pink-200">
                {img.theme.charAt(0).toUpperCase() + img.theme.slice(1)}
              </span>
            </div>
            <a
              href={img.url}
              download
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-semibold transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
