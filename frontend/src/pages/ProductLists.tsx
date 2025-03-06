import { useEffect } from "react"
import ProductCard, { LoadingProductCard } from "../components/ProductCard"
import { fetchProducts } from "../store/features/productSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"

// Sample Product
// const product = {
//   "id": 1,
//   "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   "price": 109.95,
//   "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   "category": "men's clothing",
//   "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   "rating": {
//     "rate": 3.9,
//     "count": 120
//   }
// }

export default function ProductLists() {
  const {errorMessage, isLoading, productLists} = useAppSelector(state => state.product)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 6 }, (_, index) => <LoadingProductCard key={index} />);
    }
    if (errorMessage) {
      return <h1 className="text-red-500 font-bold">Error: {errorMessage}</h1>;
    }
    return productLists.map(product => <ProductCard key={product.id} {...product} />);
  };
  return (
    <div className="grid place-items-center gap-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] p-10">
      {renderContent()}
    </div>
  )
}


