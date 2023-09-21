import { SlGraph } from "react-icons/sl";
import { FaShop } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import SidebarItem from "./SidebarItem";

export interface ISidebarItem {
  title: string;
  href: string;
  logo?: React.ReactNode;
};

const sidebarDatas: ISidebarItem[] = [
  {
    title: "Products",
    logo: <FaShop />,
    href: "/admin/products",
  },
  {
    logo: <SlGraph />,
    title: "Statistics",
    href: "/admin/statistics",
  },
  {
    logo: <AiOutlineShoppingCart />,
    title: "Orders",
    href: "/admin/orders",
  },
];


const Sidebar = () => {
  return (
    <div className="h-full w-full border-r flex flex-col p-10">
      <div className="flex flex-col gap-y-7">
        {sidebarDatas.map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};


export default Sidebar;