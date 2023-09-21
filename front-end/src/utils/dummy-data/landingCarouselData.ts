import { LandingCarouselItemType } from "@/components/page-components/home/landing-carousel/LandingCarouselItem";
import { productData } from "./dummyProductData";

const landingCarouselDatas: LandingCarouselItemType[] = [
  {
    alignment: "left",
    ...productData[0],
  },
  {
    alignment: "right",
    ...productData[1],
  }
]


export default landingCarouselDatas;