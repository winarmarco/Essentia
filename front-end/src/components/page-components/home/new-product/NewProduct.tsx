import React from "react";
import Container from "../../../shared/Container";
import newArrivalItemsData from "@/utils/dummy-data/newProduct";
import newProductData from "@/utils/dummy-data/newProduct";
import NewProductItem from "./NewProductItem";
import Section from "@/components/shared/section/section";

const NewArrival: React.FC = () => {
  return (
    <Section>
      <Container className="py-20">
        <h1 className="font-medium text-4xl underline underline-offset-8">
          NEW ARRIVAL
        </h1>
        <div>
          {newProductData.map((product, index) => {
            return <NewProductItem key={index} {...product} />;
          })}
        </div>
      </Container>
    </Section>
  );
};

export default NewArrival;
