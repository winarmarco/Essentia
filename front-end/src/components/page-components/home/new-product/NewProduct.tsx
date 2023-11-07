import React from "react";
import Container from "../../../shared/Container";
import NewProductItem from "./NewProductItem";
import Section from "@/components/shared/section/section";
import { IProduct } from "@/utils/types/products";

const NewArrival: React.FC<{products: IProduct[]}> = ({products}) => {

  const alignedProducts = products.map((product, index) => {
    return {...product, alignment: (index % 2) ? "right" : "left"};
  })


  return (
    <Section>
      <Container className="py-20">
        <h1 className="font-medium text-4xl underline underline-offset-8">
          NEW ARRIVAL
        </h1>
        <div>
          {alignedProducts.map((product, index) => {
            return <NewProductItem key={index} {...product} />;
          })}
        </div>
      </Container>
    </Section>
  );
};

export default NewArrival;
