"use client";
import Product from "@/utils/types/Product";
import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import ProductFormInput from "./ProductFormInput";
import Button from "@/components/common/Button";
import ProductImage from "../../product/product-details/product-image-list/ProductImage";
import Modal from "@/components/common/modal/Modal";
import ProductDetailsCarousel from "../../product/product-details/product-details-image-carousel/ProductDetailsCarousel";

const ProductForm = () => {
  const [images, setImages] = useState<Product["images"]>([]);
  const [zoomImage, toggleZoomImage] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const zoomHandler = (index?: number | undefined) => {
    toggleZoomImage((prevState) => !prevState);
    if (index !== undefined) {
      setActiveSlide(index);
    }
  };

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<Product & {quantity: number}>();

  const onSubmit: SubmitHandler<Product & {quantity: number}> = (data) =>
    console.log(data);

  return (
    <div className="w-full h-full flex flex-col gap-y-10 max-w-[2048px]">
      <Modal
        visible={zoomImage}
        closeModal={() => {
          toggleZoomImage((prevState) => !prevState);
        }}
      >
        <ProductDetailsCarousel
          images={images}
          initialSlide={activeSlide}
          key={activeSlide}
        />
      </Modal>
      <h1 className="text-3xl font-bold">Product Details</h1>
      <form className="flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
        <ProductFormInput
          id={"name"}
          label={"Name"}
          register={register}
          className="grid grid-cols-2 w-1/2"
          required
        />
        <ProductFormInput
          id={"price"}
          label={"Price"}
          register={register}
          className="grid grid-cols-2 w-1/2"
          required
        />
        <ProductFormInput
          id={"quantity"}
          label={"Quantity"}
          type={"number"}
          register={register}
          className="grid grid-cols-2 w-1/2"
          required
        />
        <ProductFormInput
          id={"featuredOnLandingCarousel"}
          label={"Show on landing carousel"}
          register={register}
          type="checkbox"
          className="flex !flex-row-reverse gap-x-3 mr-auto"
          required
        />
        <ProductFormInput
          id={"newProduct"}
          label={"New Product"}
          register={register}
          type="checkbox"
          className="flex !flex-row-reverse gap-x-3 mr-auto"
          required
        />

        <div className="mt-5 flex flex-col gap-y-5">
          <ProductFormInput
            id={"description"}
            label={"Description"}
            register={register}
            type="textarea"
            className="flex flex-col w-2/3 gap-y-2"
          />
          <ProductFormInput
            id={"shortDescription"}
            label={"Short Description"}
            register={register}
            type="textarea"
            className="flex flex-col w-2/3 gap-y-2"
          />
        </div>

        <ProductFormInput
          id={"images"}
          label={"New Product"}
          register={register}
          type="file"
          className="grid grid-cols-2 w-1/2"
          onChange={(e) => {
            console.log("changes");
            setImages((prevImages) => {
              if (e.target.files) {
                const newImages: Product["images"] = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
                prevImages = [...prevImages, ...newImages];
              }
              return prevImages;
            });
          }}
          multiple
          required
        />

        <div className="w-full md:w-1/2 flex flex-col space-y-10">
          {images.map((image, index) => {
            return (
              <ProductImage
                image={image}
                key={index}
                className="flex flex-col"
                zoomHandler={() => {
                  zoomHandler(index);
                }}
              />
            );
          })}
        </div>

        <div className="flex flex-row gap-x-10 mt-10">
          <Button filled>Update Product</Button>
          <Button>Delete Product</Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
