"use client";
import {IProduct} from "@/utils/types/products";
import React, { useState } from "react";
import ProductDetailsDescription from "../product-details-description/ProductDetailsDescription";
import ProductImageList from "../product-image-list/ProductImageList";
import Modal from "@/components/shared/modal/Modal";
import ProductDetailsCarousel from "../product-details-image-carousel/ProductDetailsCarousel";

const ProductDisplay: React.FC<{product: IProduct, quantity: number}> = ({product, quantity}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [zoomImage, toggleZoomImage] = useState(false);
  const zoomHandler = (index?: number | undefined) => {
    toggleZoomImage((prevState) => !prevState);
    if (index !== undefined) {
      setActiveSlide(index);
    }
  };


  return (
    <>
      <Modal
        visible={zoomImage}
        closeModal={() => {
          toggleZoomImage((prevState) => !prevState);
        }}
      >
        {product && (
          <ProductDetailsCarousel
            images={product.images}
            initialSlide={activeSlide}
            key={activeSlide}
          />
        )}
      </Modal>

      <div className="flex flex-col md:flex-row w-full flex-grow gap-x-6 ">
        <ProductImageList
          images={product.images}
          zoomImage={(imageIndex) => {
            zoomHandler(imageIndex);
          }}
        />

        <div className="w-full md:w-1/2 sticky flex-grow top-20 h-full">
          <ProductDetailsDescription product={product} quantity={quantity}/>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
