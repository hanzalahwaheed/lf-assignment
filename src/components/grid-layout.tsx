import Image from "next/image";
import { Star } from "lucide-react";

interface GridLayoutProps {
  data: {
    id: number;
    title: string;
    category: string;
    brand: string;
    price: number;
    rating: number;
    thumbnail: string;
  }[];
}

const GridLayout = ({ data }: GridLayoutProps) => (
  <div className="animate-fade-in grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
    {data.map((product) => (
      <div
        key={product.id}
        className="flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="h-48 overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover"
            width={500}
            height={500}
          />
        </div>
        <div className="flex flex-grow flex-col p-4">
          <p className="text-xs font-semibold text-neutral-500 uppercase">
            {product.category}
          </p>
          <h3 className="text-md mt-1 truncate font-bold text-neutral-800">
            {product.title}
          </h3>
          <p className="flex-grow text-sm text-neutral-500">{product.brand}</p>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-lg font-bold text-neutral-900">
              ${product.price.toFixed(2)}
            </p>
            <div className="flex items-center text-sm font-semibold text-amber-500">
              <span>
                <Star className="h-3.5 w-3.5" />
              </span>
              <span className="ml-1">{product.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default GridLayout;
