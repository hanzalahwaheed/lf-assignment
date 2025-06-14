import Image from "next/image";

interface GridLayoutProps {
  data: Array<{
    id: number;
    title: string;
    category: string;
    brand: string;
    price: number;
    rating: number;
    thumbnail: string;
    [key: string]: any;
  }>;
}

const GridLayout = ({ data }: GridLayoutProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
    {data.map((product) => (
      <div
        key={product.id}
        className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="h-48 overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover"
            width={500}
            height={500}
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-xs text-slate-500 font-semibold uppercase">
            {product.category}
          </p>
          <h3 className="text-md font-bold text-slate-800 truncate mt-1">
            {product.title}
          </h3>
          <p className="text-sm text-slate-500 flex-grow">{product.brand}</p>
          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </p>
            <div className="flex items-center text-sm font-semibold text-amber-500">
              <span>⭐</span>
              <span className="ml-1">{product.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default GridLayout;
