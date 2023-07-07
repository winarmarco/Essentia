import Product from "./Product"

interface NewProductType extends Product {
  align: "left" | "right",
}

export default NewProductType;