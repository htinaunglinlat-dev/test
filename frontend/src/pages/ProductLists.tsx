import { useEffect } from "react"
import ProductCard, { LoadingProductCard } from "../components/ProductCard"
import { fetchProducts } from "../store/features/productSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"

const product = {
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  "price": 109.95,
  "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
}

export default function ProductLists() {
  const {errorMessage, isLoading, productLists} = useAppSelector(state => state.product)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  return (
    <div className="max-w-4xl mx-auto grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
      {
        isLoading ? (
          Array.from({length: 6}).map((_, index) => <LoadingProductCard key={index} /> )
        ) : (
          productLists.map((product, index) => <ProductCard key={index} {...product} />)
        )
      }
    </div>
  )
}
