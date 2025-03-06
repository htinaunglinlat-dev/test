import { useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { ForwardRefProductCard, LoadingProductCard } from "../components/ProductCard"
import { fetchProductsByPage } from "../store/features/productByPageSlice"

export default function ProductObserver () {
  const {
    isLoading, 
    currentPage, 
    errorMessage, 
    lastPage, 
    productLists
  } = useAppSelector(state => state.productByPage)
  const dispatch = useAppDispatch()
  const ref = useRef<(HTMLDivElement)[]>([])
  const useObserverAnimation = (refElementLists: HTMLDivElement[]) => {
    if(refElementLists.length === 0) dispatch(fetchProductsByPage({page: 1}))
    const observer = new IntersectionObserver((entries) => {
      entries.map(entry => {
        // console.log('entry', entry)
        if(entry.isIntersecting && Number(entry.target.id) === productLists.length) {
          dispatch(fetchProductsByPage({page: currentPage + 1}))
        }
        if(entry.isIntersecting) {
          entry.target.classList.add('active-box')
          console.log(entry.target.id)
        } else {
          entry.target.classList.remove('active-box')
        }
      })
    }, {
      rootMargin: "10px 0px",
      threshold: 0.5
    })
    refElementLists.forEach(ele => {
      observer.observe(ele)
    })
    return observer;
  }

  useEffect(() => {
    const observer = useObserverAnimation(ref.current)
    console.log(ref.current)
    // return () => observer.disconnect()
  }, [currentPage]) 

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 6 }, (_, index) => <LoadingProductCard key={index} />);
    }
    if (errorMessage) {
      return <h1 className="text-red-500 font-bold">Error: {errorMessage}</h1>;
    }
    return productLists.map((product, index) => <ForwardRefProductCard ref={(el: HTMLDivElement) => ref.current[index] = el} key={index + 1} {...product} keyId={index +1} />);
  };
  
  return (
    <div className="grid place-items-center gap-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] p-10">
      {renderContent()}
    </div>
  )
}