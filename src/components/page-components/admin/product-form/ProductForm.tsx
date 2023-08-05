"use client";
import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import ProductFormInput from "./ProductFormInput";
import Button from "@/components/shared/Button";
import ProductImage from "../../product/product-details/product-image-list/ProductImage";
import Modal from "@/components/shared/modal/Modal";
import ProductDetailsCarousel from "../../product/product-details/product-details-image-carousel/ProductDetailsCarousel";
import {IProduct} from "@/utils/types";
import Input from "@/components/shared/input/Input";
import {LiaTimesSolid} from "react-icons/lia";
import {parseError} from "@/utils/functions/errorParser";

const ProductForm: React.FC<{
  formTitle?: string;
  newProduct?: boolean;
  defaultValues?: IProduct;
}> = ({formTitle = "New Product", newProduct = false, defaultValues}) => {
  const [images, setImages] = useState<IProduct["images"]>(defaultValues ? defaultValues.images : []);
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
    setError,
  } = useForm<IProduct>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    const productId = defaultValues?._id;
    console.log({productId}, data);
    try {
      const form = new FormData();
      const {images: newImages, ...productDetails} = data;

      const oldImages = images.filter((image) => !image.startsWith("blob:"));

      // add to formdata
      Object.values(newImages).forEach((file) => {
        form.append("images", file);
      });
      form.append(
        "product",
        JSON.stringify({...productDetails, images: oldImages})
      );

      // post to server
      const url = newProduct ? "http://localhost:3000/api/products/add" :`http://localhost:3000/api/products/${productId}`;
      const res = await fetch(
        url,
        {
          method: "POST",
          body: form,
        }
      );

      const resData = await res.json();

      if (!res.ok) throw new Error(resData.message);

      console.log(resData);
    } catch (error) {
      const errMessage = parseError(error);

      console.log(errMessage);

      if (Array.isArray(errMessage)) {
        errMessage.forEach((err) => {
          setError(err.field, {
            type: "custom",
            message: err.message,
          });
        });
      } else {
        setError("root", {
          type: "custom",
          message: errMessage.message,
        });
      }
    }
  };

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
      <h1 className="text-3xl font-bold">{formTitle}</h1>
      <form
        className="flex flex-col gap-y-5"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <Input
          id={"name"}
          label="Name"
          register={register}
          className="grid grid-cols-3 w-2/3 gap-x-4"
          errors={errors}
          required
        />
        <Input
          id={"price"}
          label="Price"
          register={register}
          className="grid grid-cols-3 w-2/3 gap-x-4"
          errors={errors}
          required
        />
        <Input
          id="stockQuantity"
          label="Stock Quantity"
          type="number"
          register={register}
          className="grid grid-cols-3 w-2/3 gap-x-4"
          errors={errors}
          required
        />
        <Input
          id="showOnLandingCarousel"
          label="Show on landing carousel?"
          type="checkbox"
          register={register}
          className="flex flex-row gap-x-3 mr-auto"
          errors={errors}
          required
        />
        <Input
          id="newProduct"
          label="New Product?"
          type="checkbox"
          register={register}
          className="flex flex-row gap-x-3 mr-auto"
          errors={errors}
          required
        />

        <div className="mt-5 flex flex-col gap-y-5">
          <Input
            id="description"
            label="Description"
            type="textarea"
            register={register}
            className="flex flex-col w-2/3 gap-y-2"
            errors={errors}
            required
          />
          <Input
            id="shortDescription"
            label="Short description"
            type="textarea"
            register={register}
            className="flex flex-col w-2/3 gap-y-2"
            errors={errors}
            required
          />
        </div>

        <Input
          id="images"
          label="Product Image"
          register={register}
          errors={errors}
          type="file"
          defaultValue=""
          className="grid grid-cols-2 w-1/2"
          onChange={(e) => {
            setImages((prevImages) => {
              if (e.target.files) {
                const newImages: IProduct["images"] = Array.from(
                  e.target.files
                ).map((file) => URL.createObjectURL(file));
                prevImages = [...prevImages, ...newImages];
              }
              return prevImages;
            });
          }}
          required
          multiple
        />

        <div className="w-full md:w-1/2 flex flex-col space-y-10">
          {images.map((imageUrl, index) => {
            return (
              <div
                className="flex flex-row items-center justify-center gap-x-5"
                key={index}
              >
                <ProductImage
                  imageUrl={imageUrl}
                  className="flex flex-col"
                  zoomHandler={() => {
                    zoomHandler(index);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    console.log();
                    setImages((prevImages) => {
                      prevImages = prevImages.filter((prevImageUrl) => {
                        return prevImageUrl !== imageUrl;
                      });

                      console.log(prevImages);
                      return prevImages;
                    });
                  }}
                >
                  <LiaTimesSolid className="text-2xl" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex flex-row gap-x-10 mt-10">
          <Button filled>
            {newProduct ? "+ Add Product" : "Update Product"}
          </Button>
          {!newProduct && <Button>Delete Product</Button>}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
