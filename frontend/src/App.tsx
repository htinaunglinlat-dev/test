import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ProductLists from "./pages/ProductLists";
import CounterPage from "./pages/CounterPage";
import { ToastContainer } from "react-toast";
import ProductObserver from "./pages/ProductObserver";
import ProductIOLib from "./pages/ProductIOLib";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" Component={HomePage}/>
        <Route path="/counter" Component={CounterPage}/>
        <Route path="/products" Component={ProductLists}/>
        {/* <Route path="/productIntersectionObserver" Component={ProductObserver}/> */}
        <Route path="/productIOLibrary" Component={ProductIOLib}/>
      </Routes>
      <ToastContainer position="top-center" delay={1000} />
    </BrowserRouter>
  )
}
