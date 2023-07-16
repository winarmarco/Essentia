import IProduct from "../types/Product";
import Product from "../types/Product";

const productData: IProduct[] = [
  {
    _id: "123",
    name: "Aria",
    images: [
      "/image 43.jpg",
      "/image 19.png",
      "/image 14.png",
      "/image 42.jpg",
    ],
    description: `
    Indulge in the harmonious allure of "Aria," a chair that seamlessly blends grace and comfort to create an exquisite seating experience. With its sleek, refined design and sumptuous upholstery, "Aria" invites you to unwind and embrace a moment of serene tranquility. Sink into its plush cushions and feel the cares of the day melt away as you find yourself enveloped in a world of effortless elegance and relaxation.

    Elevate your living space with the refined beauty of "Aria." Its meticulously crafted frame, carefully selected fabrics, and captivating presence enhance any room's aesthetic, creating a sanctuary of tranquility and style. Let "Aria" be your haven of relaxation, where design and comfort harmoniously coexist.
    `,
    price: 200.0,
    category: "Sofa",
    shortDescription:
      "Seamlessly blends grace and comfort. With its sleek design and plush uphostery, “Aria” invites you to unwind in effortless elegance, enveloped in a world of tranquility and style",
  },
  {

    _id: "123",
    name: "Aria",
    images: [
      "/image 44.jpg",
      "/image 19.png",
      "/image 14.png",
      "/image 42.jpg",
    ],
    description: `
    The Zenith coffee table exudes tranquility with its clean, minimalist design and a touch of natural beauty. Crafted from sustainable wood, its smooth surface and sleek lines create a calming presence, offering a perfect balance between style and relaxation in your living room.
    `,
    price: 400.0,
    category: "Zenith",
    shortDescription:
      "The Zenith coffee table exudes tranquility with its clean, minimalist design and a touch of natural beauty. Crafted from sustainable wood, its smooth surface and sleek lines create a calming presence, offering a perfect balance between style and relaxation in your living room.",
  },
];

export {productData};
