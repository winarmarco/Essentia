import "./globals.css";
import Navbar from "@/components/shared/navbar/Navbar";
import Category from "@/components/page-components/home/category/Category";
import About from "@/components/page-components/home/about/About";
import Feature from "@/components/page-components/home/feature/Feature";
import NewArrival from "@/components/page-components/home/new-product/NewProduct";
import Footer from "@/components/shared/footer/Footer";
import LandingCarousel from "@/components/page-components/home/landing-carousel/LandingCarousel";
import { fetchLandingProducts } from "@/utils/actions/products-action";
import { fetchCategory } from "@/utils/actions/category-action";

const Home = async () => {
  const fetchedProducts = fetchLandingProducts();
  const fetchedCategory = fetchCategory();

  const [products, category] = await Promise.all([fetchedProducts, fetchedCategory]);

  const {carouselProducts, newProducts} = products;


  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-screen">
        <Navbar />
        <LandingCarousel products={carouselProducts}/>
      </div>

      <Category categories={category}/>

      <About />

      <NewArrival products={newProducts}/>

      <Feature />
      <Footer />
    </div>
  );
};

export default Home;
