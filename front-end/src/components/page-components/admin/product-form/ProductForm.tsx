"use client";

import * as z from "zod";
import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import Button from "@/components/shared/Button";
import ProductImage from "../../product/product-details/product-image-list/ProductImage";
import Modal from "@/components/shared/modal/Modal";
import ProductDetailsCarousel from "../../product/product-details/product-details-image-carousel/ProductDetailsCarousel";
import Input from "@/components/shared/input/Input";
import {LiaTimesSolid} from "react-icons/lia";
import {parseError} from "@/utils/functions/errorParser";
import Loading from "@/components/shared/loading/Loading";
import {IProduct, ProductSchema} from "@/utils/types/products";
import {fetchCategory} from "@/utils/actions/category-action";
import toast from "react-hot-toast";
import {ICategory} from "@/utils/types/category";
import {createProduct, updateProduct} from "@/utils/actions/products-action";
import {useParams, useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {zodResolver} from "@hookform/resolvers/zod";

const ProductFormSchema = ProductSchema.omit({images: true}).extend({
  images: z.any(),
});

const ProductForm: React.FC<{
  formTitle?: string;
  newProduct?: boolean;
  defaultValues?: IProduct;
}> = ({formTitle = "New Product", newProduct = false, defaultValues}) => {
  const [images, setImages] = useState<IProduct["images"]>(
    defaultValues ? defaultValues.images : []
  );
  const {data: session} = useSession();
  const searchParams = useParams();
  const router = useRouter();
  const productId = searchParams["productId"];
  const [category, setCategory] = useState<ICategory[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [zoomImage, toggleZoomImage] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    setError,
  } = useForm<IProduct>({
    defaultValues,
    resolver: zodResolver(ProductFormSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategory = await fetchCategory();

        if (!fetchedCategory) throw new Error("Error fetching category");

        setCategory(fetchedCategory);
      } catch (error) {
        toast.error("Error fetching category");
      }
    };

    fetchData();
  }, []);

  const zoomHandler = (index?: number | undefined) => {
    toggleZoomImage((prevState) => !prevState);
    if (index !== undefined) {
      setActiveSlide(index);
    }
  };

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    setIsUploading(true);
    try {
      if (session && session.user.token) {
        const {token} = session.user;
        const form = new FormData();
        const {images: newImages, ...productDetails} = data;

        // check for image
        if (images.length < 2) {
          setIsUploading(false);
          setError("images", {message: "Product image needs to be at least 2"});
        }

        // Get Old Images
        const oldImages = images.filter((image) => !image.startsWith("blob:"));

        // Add To formData
        Object.values(newImages).forEach((file) => {
          form.append("images", file);
        });

        form.append(
          "product",
          JSON.stringify({...productDetails, images: oldImages})
        );

        // post to server
        let fetchedProduct;
        if (!newProduct) {
          fetchedProduct = await updateProduct(token.id, productId, form);
        } else {
          fetchedProduct = await createProduct(token.id, form);
        }

        if (!fetchedProduct) throw new Error("Cannot fetch product");

        toast.success(
          `Successfully ${newProduct ? "created" : "updated"} product!`
        );
      } else {
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.message);
    }

    setIsUploading(false);
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
      {category && (
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
            type="number"
            step=".01"
            register={register}
            className="grid grid-cols-3 w-2/3 gap-x-4"
            errors={errors}
            required
          />
          <Input
            id="stockQuantity"
            label="Stock Quantity"
            type="number"
            step="1"
            register={register}
            className="grid grid-cols-3 w-2/3 gap-x-4"
            errors={errors}
            required
          />
          <Input
            id="category"
            label="Category"
            type="select"
            choice={category.map((item) => {
              return {name: item.name, value: item._id};
            })}
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
                      setImages((prevImages) => {
                        prevImages = prevImages.filter((prevImageUrl) => {
                          return prevImageUrl !== imageUrl;
                        });
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
              {isUploading && <Loading className="text-white" />}
              {!isUploading && newProduct && "+ Add Product"}
              {!isUploading && !newProduct && "Update Product"}
            </Button>
            {!newProduct && (
              <Button>{isDeleting ? <Loading /> : "Delete Product"}</Button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductForm;
