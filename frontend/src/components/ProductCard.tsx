import * as motion from "motion/react-client"
import { Ref } from "react";

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export const LoadingProductCard = () => {
  return (
    <div className="w-full max-w-[400px] rounded-lg shadow-lg bg-white animate-pulse border border-gray-200 p-5">
      {/* title */}
      <div className="w-3/4 h-3 bg-gray-200 my-2"></div>

      {/* image */}
      <div className="w-full h-60 bg-gray-200 my-2"></div>

      {/* content */}
      <div className="space-x-5 space-y-2">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 h-2 rounded bg-gray-200"></div>
          <div className="col-span-1 h-2 rounded bg-gray-200"></div>
        </div>
        <div className="h-2 rounded bg-gray-200"></div>
      </div>
    </div>
  )
}


const ProductCard: React.FC<ProductType> = ({ title, price, image, rating, category }) => {
  return (
    <motion.div className="max-w-[400px] w-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
    initial={{opacity: 0, y: 20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.8}}
    >
      <motion.img src={image} alt={title} className="h-60 object-contain w-11/12 mx-auto" 
        initial={{opacity: 0, y: 10}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.8, delay: 0.3}}
      />
      <motion.div className="p-4" 
      initial={{opacity: 0, y: 10}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.8, delay: 0.5}}
      >
        <h3 className="text-lg font-bold mb-2 line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-2 capitalize">{category}</p>
        <p className="text-blue-600 font-semibold mb-2">${price}</p>
        <div className="flex items-center justify-between">
          <span className="text-yellow-500 text-sm">
            ⭐ {rating.rate} ({rating.count} reviews)
          </span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ForwardRefProductCard: React.FC<ProductType & {ref: Ref<HTMLDivElement>, keyId: number}> = ({ id, title, price, image, rating, category, keyId ,ref = null }) => {
  console.log('keyId', keyId)
  return (
    <div id={String(keyId)} ref={ref} className="max-w-[400px] w-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      <motion.img src={image} alt={title} className="h-60 object-contain w-11/12 mx-auto" 
        initial={{opacity: 0, y: 10}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.8, delay: 0.3}}
      />
      <motion.div className="p-4" 
      initial={{opacity: 0, y: 10}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.8, delay: 0.5}}
      >
        <h3 className="text-lg font-bold mb-2 line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-2 capitalize">{id}- {category}</p>
        <p className="text-blue-600 font-semibold mb-2">${price}</p>
        <div className="flex items-center justify-between">
          <span className="text-yellow-500 text-sm">
            ⭐ {rating.rate} ({rating.count} reviews)
          </span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </motion.div>
    </div>
  );
};


export default ProductCard;
