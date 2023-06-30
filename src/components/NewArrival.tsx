import React from "react";
import Image, { StaticImageData } from "next/image";
import Container from "./Container";
import ariaPng from "../../public/image 5.png";
import cosettePng from "../../public/image 6.png";
import Button from "./Button";
import { EnumMember } from "typescript";

type newArrivalData = {
  title: string,
  description: string,
  image: StaticImageData,
  align: "left" | "right",
}

const newArrivalItemsData: newArrivalData[] =  [
  {
    title: 'Aria',
    description: 'Seamlessly blends grace and comfort. With its sleek design and plush uphostery, “Aria” invites you to unwind in effortless elegance, enveloped in a world of tranquility and style',
    image: ariaPng,
    align: 'right',
  }, {
    title: 'Cosette',
    image: cosettePng,
    description: 'Experience the epitome of refine luxury with the exquisite  “Cosette” sofa, where elegance meets  uparalleld comfort',
    align: 'left',
  }
]


const NewArrivalItem: React.FC<{item: newArrivalData}> = (props) => {
  const alignment = `sm:${props.item.align === 'left' ? 'flex-row-reverse' : 'flex-row'}`
  const textAlignment = `sm:text-${props.item.align}`;

  return (
    <div className={`w-full flex flex-col ${alignment} items-center justify-between mt-20`}>
      <Image src={props.item.image} alt="Aria" className="w-full sm:w-[400px] h-[400px] object-cover" />

      <div className={`mt-5 w-full sm:w-1/3 text-left ${textAlignment}`}>
        <h1 className="text-3xl font-medium">{props.item.title}</h1>
        <p className="leading-loose mt-2">
          {props.item.description}
        </p>
        <Button className="main-black sec-white mt-8" filled>Learn more</Button>
      </div>
    </div>
  );
};

const NewArrival: React.FC = () => {
  return (
    <Container className="py-20">
      <h1 className="font-medium text-4xl underline underline-offset-8">NEW ARRIVAL</h1>
      <div>
        {newArrivalItemsData.map((item) => {
          return <NewArrivalItem key={item.title} item={item}/>
        })}
      </div>
    </Container>
  );
};

export default NewArrival;
