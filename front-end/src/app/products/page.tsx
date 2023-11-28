import Navbar from "@/components/shared/navbar/Navbar";
import "../globals.css";
import Container from "@/components/shared/Container";
import Footer from "@/components/shared/footer/Footer";
import ProductCard from "@/components/page-components/product/product-card/ProductCard";
import Header from "@/components/shared/header/Header";
import Main from "@/components/shared/main/Main";
import { fetchProduct } from "@/utils/actions/products-action";
import { IProduct, ProductSchema } from "@/utils/types/products";
import { fetchCategory } from "@/utils/actions/category-action";
import ProductCategoryFilter from "@/components/page-components/product/product-category-filter/ProductCategoryFilter";
import { Suspense } from "react";
import Loading from "@/components/shared/loading/Loading";


const Products = async () => {

  const fetchedProduct = fetchProduct();
  const fetchedCategory = fetchCategory();

  const [products, category] = await Promise.all([fetchedProduct, fetchedCategory]);

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Header className="sticky top-0 z-30 bg-white">
        <Navbar />
        <Container className="flex flex-col flex-grow h-full w-full mt-4">
          <h1 className="text-4xl font-semibold">PRODUCTS</h1>
          <div className="w-full h-[1px] bg-black mt-4 mb-8"></div>
        </Container>
      </Header>

      <Main className="flex-grow">
        <Container className="flex-grow h-full w-full">
          <div className="flex flex-row flex-grow w-full h-full">
              <div className="w-1/3 mr-20 sticky top-[12rem] h-full">
                <ProductCategoryFilter 
                  categories={category}
                  active={0}
                />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 w-full">
                {products && products.map((product: IProduct) => {
                  return (
                    <ProductCard
                      key={product._id}
                      {...product}
                    />
                  );
                })}
              </div>
          </div>
        </Container>
      </Main>
      <Footer />
    </div>
  );
};

export default Products;