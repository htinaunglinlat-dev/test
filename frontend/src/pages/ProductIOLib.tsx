import { useInView } from "react-intersection-observer";
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { LoadingProductCard, ProductType } from "../components/ProductCard"
import { fetchProductsByPage } from "../store/features/productByPageSlice"
import * as motion from 'motion/react-client'

export default function ProductIOLib() {
  const { ref, inView } = useInView({
    triggerOnce: false,  // Fires only once when element enters the viewport
    threshold: 0.8,     // 50% of the element should be in view
    rootMargin: '0px'
  });
  const {
    lastPage,
    isLoading, 
    currentPage, 
    errorMessage, 
    productLists
  } = useAppSelector(state => state.productByPage)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if(productLists.length === 0) dispatch(fetchProductsByPage({page: 1}))
  }, []) 

  useEffect(() => {
    if(inView && !isLoading && !(currentPage > lastPage)) {
      dispatch(fetchProductsByPage({page: currentPage +1}))
    }
  }, [inView])

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 8 }, (_, index) => <LoadingProductCard key={index} />);
    }
    if (errorMessage) {
      return <h1 className="text-red-500 font-bold">Error: {errorMessage}</h1>;
    }
    return productLists.map((product, index) => <ProductCard1 ref={productLists.length -1 === index ? ref : null} key={index + 1} {...product} />);
  };
  
  return (
    <div className="grid place-items-center gap-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] p-10">
      {productLists.map((product, index) => <ProductCard1 ref={productLists.length -1 === index ? ref : null} key={index + 1} {...product} />)}
      {isLoading && Array.from({ length: 8 }, (_, index) => <LoadingProductCard key={index} />)}
    </div>
  )
}

export const ProductCard1: React.FC<ProductType & {ref?: React.Ref<HTMLDivElement>}> = ({ id, title, price, image, rating, category, ref}) => {
  return (
    <div id={String(id)} ref={ref} className="max-w-[400px] w-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      <motion.img src={image} alt={title} className="h-60 object-contain w-11/12 mx-auto" 
      initial={{opacity: 0, y: 10}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.8, delay: 0.3}}
      />
      <motion.div className="p-4" 
      initial={{opacity: 0, y: 10}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.8, delay: 0.3}}
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